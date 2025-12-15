"use client";

import { useEffect, useState } from "react";

type User = {
  email: string;
  password: string;
};

export default function RegUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!email || !password) return;

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      setMsg(data.error);
    } else {
      setMsg("User added!");
      setEmail("");
      setPassword("");
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

      {msg && <p className="mb-4">{msg}</p>}

      <ul className="mb-6 space-y-2">
        {users.map((u, i) => (
          <li key={i} className="bg-zinc-800 p-2 rounded">
            {u.email} | {u.password}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 text-white rounded w-72"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="p-2 text-white rounded w-72"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={addUser} className="bg-red-600 px-4 py-2 rounded">
        Add User
      </button>
    </div>
  );
}
