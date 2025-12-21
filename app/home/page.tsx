"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const selected = localStorage.getItem("selected_profile");

    if (!selected) {
      router.push("/profiles");
    } else {
      setProfile(JSON.parse(selected));
    }
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {profile.name} 🎬
      </h1>

      <p className="text-zinc-400 mb-8">
        Netflix-style home page content goes here.
      </p>

      {/* Example rows */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl mb-2">Trending Now</h2>
          <div className="h-40 bg-zinc-800 rounded" />
        </div>

        <div>
          <h2 className="text-xl mb-2">Continue Watching</h2>
          <div className="h-40 bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
