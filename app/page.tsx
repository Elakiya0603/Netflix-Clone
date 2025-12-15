"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("login_email");
    if (!email) {
      // Not logged in → go to login page
      router.push("/login");
    } else {
      // Logged in → go to profiles selection page
      router.push("/browse");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}
