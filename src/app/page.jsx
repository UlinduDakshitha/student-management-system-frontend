 import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>
      <p>Welcome to the system</p>

      <Link href="/login">
        <button>Login</button>
      </Link>

      <br /><br />

      <Link href="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}