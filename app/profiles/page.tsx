"use client";

import { useEffect, useState } from "react";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profileName, setProfileName] = useState("");
  const [error, setError] = useState("");

  const loggedInEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("login_email")
      : null;

  // 🔹 Fetch existing profiles
  const fetchProfiles = async () => {
    if (!loggedInEmail) return;

    const res = await fetch(`/api/profiles?email=${loggedInEmail}`);
    const data = await res.json();
    setProfiles(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // 🔹 CREATE PROFILE (THIS IS WHERE YOUR FETCH GOES)
  const createProfile = async () => {
    setError("");

    if (!profileName.trim()) {
      setError("Profile name required");
      return;
    }

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loggedInEmail,
        name: profileName.trim(),
      }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setProfileName("");
      fetchProfiles(); // refresh list
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-4">Who’s watching?</h1>

      <div className="flex gap-4 mb-6">
        {profiles.map((p) => (
          <div
            key={p._id}
            className="bg-zinc-800 px-6 py-4 rounded-lg"
          >
            {p.name}
          </div>
        ))}
      </div>

      {profiles.length < 4 && (
        <>
          <input
            className="p-2 bg-zinc-800 rounded mr-2"
            placeholder="Profile name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <button
            onClick={createProfile}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Add Profile
          </button>
        </>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
