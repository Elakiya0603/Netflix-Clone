"use server";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mailer";
import { getDeviceId } from "@/lib/device";

const MAX_DEVICES = 4;


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const emailTrimmed = email.trim().toLowerCase();
  const passwordTrimmed = password.trim();

  const userAgent = req.headers.get("user-agent") || "unknown";
  const deviceId = getDeviceId(userAgent);

  const client = await clientPromise;
  const db = client.db("netflix_clone");

  // 1️⃣ User check
  const user = await db.collection("users").findOne({ email: emailTrimmed });
  if (!user) return NextResponse.json({ error: "Account not found" }, { status: 401 });
  if (user.password !== passwordTrimmed)
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

  // 2️⃣ CHECK IF DEVICE IS TRUSTED ⭐
  const trusted = await db.collection("trusted_devices").findOne({
    email: emailTrimmed,
    deviceId,
  });

  if (trusted) {
    // ✅ SAME DEVICE → NO OTP
    return NextResponse.json({ success: true });
  }
 const deviceCount = await db
    .collection("trusted_devices")
    .countDocuments({ email: emailTrimmed });

  if (deviceCount >= MAX_DEVICES) {
    // ❌ Device limit reached
    return NextResponse.json(
      { error: "Device limit reached. Remove a device to continue." },
      { status: 403 }
    );
  }
  // 3️⃣ NEW / RISKY DEVICE → SEND OTP
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  await db.collection("otp_verifications").updateOne(
    { email: emailTrimmed },
    { $set: { otp, expiresAt, createdAt: new Date() } },
    { upsert: true }
  );

  await sendOTPEmail(emailTrimmed, otp);

  return NextResponse.json({ requiresOTP: true });
}
