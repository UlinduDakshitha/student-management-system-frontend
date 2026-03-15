 import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px", display: "flex", height: "80vh", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Student Management System</h1>
      <p>Welcome to the Studentsystem</p>

      <Link href="/login">
        <button>Login</button>
      </Link>

      <br /> <br />

      <Link href="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}