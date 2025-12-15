"use client";

import { useState, useEffect } from "react";

const avatarColors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-yellow-500",
  "bg-indigo-600",
];

const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};


export default function BrowsePage() {
  const [username, setUsername] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profileName, setProfileName] = useState("");
  const [error, setError] = useState("");

  const loggedInEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("login_email")
      : null;

  // 🔹 Fetch profiles
  const fetchProfiles = async () => {
    if (!loggedInEmail) return;

    const res = await fetch(`/api/profiles?email=${loggedInEmail}`);
    const data = await res.json();
    setProfiles(data);
  };

  const handleLogout = () => {
  localStorage.removeItem("login_email");
  localStorage.removeItem("selected_profile");
  window.location.href = "/login";
};



  // 🔹 Create profile
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
      fetchProfiles();
    }
  };

  // 🔹 Username from email
  useEffect(() => {
    const email = localStorage.getItem("login_email");
    if (email) {
      setUsername(email.split("@")[0]);
    }
  }, []);

  
  useEffect(() => {
    fetchProfiles();
  }, []);

  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* 🔹 Header */}
      <header className="px-10 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              🎬 Hi, {username}
            </h1>

            <button
              onClick={handleLogout}
              className="bg-zinc-800 px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </header>


      {/* 🔹 Profiles Section */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-6">Who’s watching?</h2>

        <div className="flex gap-6 mb-6">
          {profiles.map((p) => (
                            <div
                  key={p._id}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  {/* Avatar */}
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white
                      ${getAvatarColor(p.name)}
                      group-hover:scale-110 transition`}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <p className="text-lg group-hover:text-red-500 transition">
                    {p.name}
                  </p>
                </div>

          ))}
        </div>

        {profiles.length < 4 && (
          <div className="flex gap-2">
            <input
              className="p-2 bg-zinc-800 rounded"
              placeholder="Profile name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <button
              onClick={createProfile}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Add Profile
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}
