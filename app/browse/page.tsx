"use client";

import { useState, useEffect } from "react";
import CustomButton from "../components/customButton";
import CustomTextInput from "../components/customTextInput";

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
    const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

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

const selectProfile = (profile: any) => {
  localStorage.setItem("selected_profile", JSON.stringify(profile));
  window.location.href = "/home";
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

  // Edit Profile

   const startEdit = (profile: any) => {
    setEditingId(profile._id);
    setEditingName(profile.name);
  };

  const saveEdit = async () => {
    if (!editingName.trim() || !editingId) return;

    await fetch("/api/profiles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileId: editingId,
        name: editingName.trim(),
      }),
    });

    setEditingId(null);
    setEditingName("");
    fetchProfiles();
  };

  // Delete Profile

  const deleteProfile = async (profileId: string) => {
    const ok = confirm("Delete this profile?");
    if (!ok) return;

    await fetch("/api/profiles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    });

    fetchProfiles();
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
      {/* Header */}
      <header className="px-10 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Who’s watching?</h1>
        <CustomButton onClick={handleLogout} size="sm" fullWidth={false}>
          Logout
        </CustomButton>
      </header>

      {/* Profiles */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex gap-8 mb-10">
          {profiles.map((p) => (
            <div
              key={p._id}
              className="relative flex flex-col items-center gap-3 group"
            >
              {/* Avatar */}
              <div
                onClick={() => selectProfile(p)}
                className={`w-24 h-24 rounded-full flex items-center justify-center
                text-4xl font-bold cursor-pointer text-white
                ${getAvatarColor(p.name)}
                group-hover:scale-110 transition`}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>

              {/* Name / Edit */}
              {editingId === p._id ? (
                <div className="flex gap-2">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-zinc-800 px-2 rounded"
                  />
                  <button onClick={saveEdit}>✅</button>
                </div>
              ) : (
                <p className="text-lg">{p.name}</p>
              )}

              {/* Hover Actions */}
              <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="bg-zinc-700 px-2 py-1 rounded text-sm"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteProfile(p._id)}
                  className="bg-red-600 px-2 py-1 rounded text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Profile */}
        {profiles.length < 4 && (
          <div className="flex gap-3">
            <CustomTextInput
              placeholder="Profile name"
              value={profileName}
              onChange={(e) => setProfileName(e.currentTarget.value)}
              className="bg-zinc-800 px-3 py-2 rounded"
            />
            <CustomButton onClick={createProfile} fullWidth={false}>
              Add Profile
            </CustomButton>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}

