"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
    </div>
  );
}