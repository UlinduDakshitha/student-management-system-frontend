"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import styles from "./page.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.log(error);
    }
  };

  
  return (
    <main className={styles.page}>
      <div className={styles.blurA} />
      <div className={styles.blurB} />

      <section className={styles.shell}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <p className={styles.kicker}>Welcome back</p>
            <h1>Sign in and return to your student workspace.</h1>
            <p>
              Access the dashboard, manage records, and keep your student system
              moving without noise.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.field}>
              <span>Username</span>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className={styles.input}
              />
            </label>


            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Need an account? <Link href="/register">Create one here</Link>
          </p>
        </div>

        <div className={styles.infoPanel}>
          <div className={styles.infoTop}>
            <p className={styles.panelTag}>Admin access</p>
            <h2>Everything important, kept in one clean control center.</h2>
            <p className={styles.panelText}>
              Log in to update student details, review course information, and
              keep records organized with a sharper workflow.
            </p>
          </div>

          <div className={styles.metricGrid}>
            <div className={styles.metricCard}>
              <strong>Fast entry</strong>
              <span>Jump into your dashboard with a minimal sign-in flow.</span>
            </div>
            <div className={styles.metricCard}>
              <strong>Clear actions</strong>
              <span>
                Add, edit, and remove student records without friction.
              </span>
            </div>
            <div className={`${styles.metricCard} ${styles.metricWide}`}>
              <strong>Built for daily use</strong>
              <span>
                A focused interface for school admins who need practical tools
                and a calmer visual experience.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
