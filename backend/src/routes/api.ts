import { db } from "../db/database";
import { posts } from "../db/schema";
import { eq } from "drizzle-orm";

import { register, login } from "../auth";
import { authMiddleware } from "../middleware/auth-middleware";

export function registerApiRoutes(app: any) {

  // -------------------------
  // AUTH ROUTES (NO PROTECTION)
  // -------------------------

  app.post("/api/register", async (req: any) => {
    try {
      const { email, password } = await req.json();
      const result = await register(email, password);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  });

  app.post("/api/login", async (req: any) => {
    try {
      const { email, password } = await req.json();
      const result = await login(email, password);
      return Response.json(result);
    } catch (err: any) {
      return new Response(err.message, { status: 400 });
    }
  });


  // -------------------------
  // POSTS ROUTES (PROTECTED)
  // -------------------------

  // CREATE
  app.post("/api/posts", async (req: any) => {
    const authError = authMiddleware(req);
    if (authError) return authError;

    const { content } = await req.json();

    const result = await db
      .insert(posts)
      .values({ content })
      .returning();

    return Response.json(result);
  });


  // READ
  app.get("/api/posts", async (req: any) => {
    const authError = authMiddleware(req);
    if (authError) return authError;

    const result = await db.select().from(posts);
    return Response.json(result);
  });


  // UPDATE
  app.put("/api/posts/:id", async (req: any) => {
    const authError = authMiddleware(req);
    if (authError) return authError;

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
    const authError = authMiddleware(req);
    if (authError) return authError;

    const id = req.params.id;

    const result = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    return Response.json(result);
  });

}