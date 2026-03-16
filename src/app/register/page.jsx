"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import styles from "./page.module.css";

export default function RegisterPage() {
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
      await API.post("/register", form);
      alert("Registration successful");
      router.push("/login");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />

      <section className={styles.shell}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Create your admin access</p>
          <h1 className={styles.title}>
            Set up your account and start managing students smarter.
          </h1>
          <p className={styles.description}>
            Register once, then move directly into your student management
            workflow with a cleaner dashboard experience.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlightCard}>
              <strong>Quick onboarding</strong>
              <span>
                Create your access in seconds and continue to login immediately.
              </span>
            </div>
            <div className={styles.highlightCard}>
              <strong>Focused workflow</strong>
              <span>
                Built for managing records, updates, and student operations from
                one place.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <p className={styles.formEyebrow}>Register</p>
            <h2>Open a new account</h2>
            <p>Use a username and password to create your admin profile.</p>
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
              Create Account
            </button>
          </form>
 
 
          <p className={styles.footerText}>
            Already registered? <Link href="/login">Go to login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
