import { db } from "../db/database";
import { posts } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerApiRoutes(app: any) {

  // CREATE
  app.post("/api/posts", async (req: any) => {
    const { content } = await req.json();

    const result = await db
      .insert(posts)
      .values({ content })
      .returning();

    return Response.json(result);
  });

  // READ
  app.get("/api/posts", async () => {
    const result = await db.select().from(posts);
    return Response.json(result);
  });

  // UPDATE
  app.put("/api/posts/:id", async (req: any) => {
    const { content } = await req.json();
    const id = req.params.id;

    const result = await db
      .update(posts)
      .set({ content })
      .where(eq(posts.id, id))
      .returning();

    return Response.json(result);
  });

  // DELETE
  app.delete("/api/posts/:id", async (req: any) => {
    const id = req.params.id;

    const result = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    return Response.json(result);
  });
}