"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");

    const email = localStorage.getItem("login_email")?.trim().toLowerCase();


    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp:otp.trim() }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/browse");
    } else {
      setError(data.error || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-[350px]">
        <h1 className="text-white text-2xl mb-6">Verify OTP</h1>

        <input
          className="w-full p-3 rounded bg-zinc-800 text-white mb-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full bg-red-600 py-3 rounded text-white font-semibold"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
