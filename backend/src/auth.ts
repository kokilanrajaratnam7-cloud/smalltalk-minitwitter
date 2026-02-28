import { db } from "./db/database";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function register(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);

  return db.insert(users)
    .values({ email, password: hashed })
    .returning();
}

export async function login(email: string, password: string) {
  const user = await db.select()
    .from(users)
    .where(eq(users.email, email));

  if (!user.length) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user[0].password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user[0].id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}