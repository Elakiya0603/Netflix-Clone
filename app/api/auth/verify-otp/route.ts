"use server";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { getDeviceId } from "@/lib/device";
import { log } from "console";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  const emailTrimmed = email.trim().toLowerCase();
  const otpTrimmed = otp.trim();

  const userAgent = req.headers.get("user-agent") || "unknown";
  const deviceId = getDeviceId(userAgent);
console.log(deviceId,'52525');
  const client = await clientPromise;
  const db = client.db("netflix_clone");

  const record = await db
    .collection("otp_verifications")
    .findOne({ email: emailTrimmed });

  if (!record) return NextResponse.json({ error: "OTP not found" });
  if (record.expiresAt < Date.now())
    return NextResponse.json({ error: "OTP expired" });
  if (record.otp !== otpTrimmed)
    return NextResponse.json({ error: "Invalid OTP" });

  // ✅ TRUST THIS DEVICE
  await db.collection("trusted_devices").insertOne({
    email: emailTrimmed,
    deviceId,
    createdAt: new Date(),
  });

  // Cleanup OTP
  await db.collection("otp_verifications").deleteOne({ email: emailTrimmed });

  return NextResponse.json({ success: true });
}
