import { Queue, Worker } from "bullmq";
import { analyzeContent } from "../routes/api";
import { db } from "../db/database";
import { postsTable } from "../db/schema";
import { eq } from "drizzle-orm";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
};

export const postQueue = new Queue("post-analysis", {
  connection,
});

export function initializeMessageBroker() {
  if (process.env.SERVER_ROLE === "worker") {
    console.log("Worker mode active — starting BullMQ worker...");

    const worker = new Worker(
      "post-analysis",
      async (job) => {
        const { postId } = job.data;

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
              content:
                "[This post was removed due to policy violation]",
              status: "flagged",
              sentiment: analysis.sentiment,
            })
            .where(eq(postsTable.id, postId));
        } else {
          await db
            .update(postsTable)
            .set({
              status: "clean",
              sentiment: analysis.sentiment,
            })
            .where(eq(postsTable.id, postId));
        }
      },
      { connection }
    );

    worker.on("completed", (job) => {
      console.log(`Job ${job.id} completed`);
    });

    worker.on("failed", (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
  }
}