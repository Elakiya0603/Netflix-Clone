"use server";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

// GET all users (hide password for safety in UI)
export async function GET() {
  const client = await clientPromise;
  const db = client.db("netflix_clone");
  const users = await db.collection("users").find({}).toArray();

  const safeUsers = users.map(u => ({ email: u.email, password: u.password }));
  return NextResponse.json(safeUsers);
}

// POST add new user
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("netflix_clone");

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Save password directly (plain text)
  await db.collection("users").insertOne({ email, password, createdAt: new Date() });

  return NextResponse.json({ success: true });
}
