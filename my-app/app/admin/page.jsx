"use client"; // Enable Client Component

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user } = useUser(); // Get logged-in user details
  const { getToken } = useAuth(); // Get token for API calls

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken(); // Get Clerk session token

        const res = await fetch("/api/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for verification
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  if (!user) return <p className="text-red-500 text-center mt-10">Access Denied</p>;
  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Logged-in Users</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Avatar</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="py-2 px-4 border">
                <img src={u.imageUrl} alt={u.fullName} className="w-10 h-10 rounded-full mx-auto" />
              </td>
              <td className="py-2 px-4 border">{u.fullName || "N/A"}</td>
              <td className="py-2 px-4 border">{u.email || "N/A"}</td>
              <td className="py-2 px-4 border">
                {u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
