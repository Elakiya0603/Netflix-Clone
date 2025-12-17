"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Text, TextInput } from "@mantine/core";
import CustomTextInput from "../components/customTextInput";
import CustomButton from "../components/customButton";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // Trim email & password to avoid accidental spaces
    const emailTrimmed = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrimmed, password: passwordTrimmed }),
      });

      const data = await res.json();
      console.log("Login API response:", data); // for debugging

      // 🔐 Netflix logic
      if (data.requiresOTP) {
        localStorage.setItem("login_email", emailTrimmed);
        router.push("/otp");
      } else if (data.success) {
        localStorage.setItem("login_email", emailTrimmed);
        router.push("/browse");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };



  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Text className="text-red-500 mb-6" style={{ fontSize: "34px", fontWeight:600 }}>NETFLIX</Text>
      <div className="bg-zinc-900 p-8 rounded-xl w-[350px]">
        <Text size="md" className="text-white text-2xl mb-6">Sign In</Text>

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white mb-4"
        />

        <CustomTextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white mb-4"
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

          <CustomButton onClick={handleLogin}>
          Sign In
        </CustomButton>
      </div>
    </div>
  );
}
