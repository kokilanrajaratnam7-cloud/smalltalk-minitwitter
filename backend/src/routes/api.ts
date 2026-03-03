import { type Express, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { Ollama } from "ollama";
import { db } from "../db/database";
import { postsTable, usersTable } from "../db/schema";
import authMiddleware from "../middleware/auth-middleware";
import authRoutes from "../auth";

const ollamaClient = new Ollama({
  host: "http://ollama:11434",
});

/* =========================================
   ANALYZE CONTENT (Moderation + Sentiment)
========================================= */
async function analyzeContent(content: string): Promise<{
  isHate: boolean;
  sentiment: "positive" | "neutral" | "negative";
}> {
  try {
    const response = await ollamaClient.chat({
      model: "llama3:latest",
      messages: [
        {
          role: "system",
          content: `
You are a strict content moderation AI.

Analyze the text and return ONLY valid JSON in this exact format:

{
  "flag": true or false,
  "sentiment": "positive" | "neutral" | "negative"
}

Flag should be true ONLY if the text contains:
- violent threats
- hate speech
- racism
- sexual explicit content

No explanations. No extra text. Only JSON.
`
        },
        {
          role: "user",
          content
        }
      ],
      options: {
        temperature: 0,
      }
    });

    const raw = response.message.content.trim();
    console.log("AI RAW RESPONSE:", raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      console.error("JSON parse error:", raw);
      return {
        isHate: false,
        sentiment: "neutral"
      };
    }

    return {
      isHate: parsed.flag === true,
      sentiment:
        parsed.sentiment === "positive" ||
        parsed.sentiment === "negative"
          ? parsed.sentiment
          : "neutral"
    };

  } catch (error) {
    console.error("AI failure:", error);

    // NEVER punish user if AI fails
    return {
      isHate: false,
      sentiment: "neutral"
    };
  }
}

/* =========================================
   BACKGROUND MODERATION
========================================= */
async function backgroundModeration(postId: number) {
  try {
    const [post] = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, postId));

    if (!post) return;

    const analysis = await analyzeContent(post.content);

    if (analysis.isHate) {
      await db
        .update(postsTable)
        .set({
          content: "[This post was removed due to policy violation]",
          status: "flagged",
          sentiment: analysis.sentiment
        })
        .where(eq(postsTable.id, postId));

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, post.userId));

      console.log(
        `🚨 ALERT: Hate speech detected | User: ${user?.username} | PostID: ${postId}`
      );
    } else {
      await db
        .update(postsTable)
        .set({
          status: "clean",
          sentiment: analysis.sentiment
        })
        .where(eq(postsTable.id, postId));
    }

  } catch (error) {
    console.error("Background moderation error:", error);
  }
}

/* =========================================
   API INITIALIZER
========================================= */
export const initializeAPI = (app: Express) => {
  app.use("/auth", authRoutes);
  app.use(authMiddleware);

  // GET POSTS
  app.get("/posts", async (_req: Request, res: Response) => {
    const posts = await db
      .select({
        id: postsTable.id,
        content: postsTable.content,
        userId: postsTable.userId,
        status: postsTable.status,
        sentiment: postsTable.sentiment,
        username: usersTable.username
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id));

    res.send(posts);
  });

  // CREATE POST
  app.post("/posts", async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const content = req.body.content;

    if (!content || content.length < 1) {
      return res.status(400).send({ error: "Content required" });
    }

    const [createdPost] = await db
      .insert(postsTable)
      .values({
        content,
        userId: req.user.id,
        status: "pending",
        sentiment: "unknown"
      })
      .returning();

    if (!createdPost) {
      return res.status(500).send({ error: "Post creation failed" });
    }

    res.send(createdPost);

    setTimeout(() => {
      backgroundModeration(createdPost.id);
    }, 100);
  });

  // UPDATE POST
  app.put("/posts/:id", async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const id = Number(req.params.id);

    const [post] = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, id));

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.userId !== req.user.id) {
      return res.status(403).send({ error: "Forbidden" });
    }

    const [updatedPost] = await db
      .update(postsTable)
      .set({
        content: req.body.content,
        status: "pending",
        sentiment: "unknown"
      })
      .where(eq(postsTable.id, id))
      .returning();

    if (!updatedPost) {
      return res.status(500).send({ error: "Update failed" });
    }

    setTimeout(() => {
      backgroundModeration(id);
    }, 100);

    res.send(updatedPost);
  });

  // DELETE POST
  app.delete("/posts/:id", async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const id = Number(req.params.id);

    const [post] = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, id));

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.userId !== req.user.id) {
      return res.status(403).send({ error: "Forbidden" });
    }

    await db.delete(postsTable).where(eq(postsTable.id, id));

    res.send({ id });
  });
};