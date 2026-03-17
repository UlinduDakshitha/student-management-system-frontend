"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import styles from "./page.module.css";


export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  const router = useRouter();
  const totalStudents = students.length;
  const courseCount = new Set(
    students.map((student) => student.course).filter(Boolean),
  ).size;

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Please login first");
      router.push("/login");
    }
  };

  useEffect(() => {
    let isMounted = true;

    API.get("/students")
      .then((res) => {
        if (isMounted) {
          setStudents(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Please login first");
        router.push("/login");
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", form);
      alert("Student added");

      setForm({
        name: "",
        email: "",
        course: "",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to add student");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      alert("Student deleted");
      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <p className={styles.kicker}>Dashboard overview</p>
          <h2 className={styles.title}>
            Manage students from one calm, focused workspace.
          </h2>
          <p className={styles.description}>
            Add new student profiles, keep course details organized, and handle
            edits without digging through cluttered screens.
          </p>

          <div className={styles.stats}>
            <article className={styles.statCard}>
              <span>Total students</span>
              <strong>{totalStudents}</strong>
            </article>
            <article className={styles.statCard}>
              <span>Courses listed</span>
              <strong>{courseCount}</strong>
            </article>
            <article className={styles.statCard}>
              <span>Status</span>
              <strong>{totalStudents === 0 ? "Empty" : "Active"}</strong>
            </article>
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <p className={styles.panelTag}>Quick note</p>
          <h3>Keep student information current and easy to scan.</h3>
          <p>
            Every record stays one click away from edit or delete actions,
            making routine admin work faster and cleaner.
          </p>
        </aside>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.formCard}>
          <div className={styles.sectionHeader}>
            <p>Add Student</p>
            <h3>Create a new record</h3>
          </div>

          <form onSubmit={addStudent} className={styles.form}>
            <label className={styles.field}>
              <span>Student name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter student name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter student email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span>Course</span>
              <input
                type="text"
                name="course"
                placeholder="Enter course"
                value={form.course}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <button type="submit" className={styles.primaryButton}>
              Add Student
            </button>
          </form>
        </div>

        <div className={styles.listCard}>
          <div className={styles.sectionHeader}>
            <p>Student List</p>
            <h3>
              {totalStudents === 0
                ? "No records yet"
                : `${totalStudents} record${totalStudents === 1 ? "" : "s"}`}
            </h3>
          </div>

          {students.length === 0 ? (
            <div className={styles.emptyState}>
              <strong>No students found</strong>
              <span>
                Add your first student using the form to start building the
                list.
              </span>
            </div>
          ) : (
            <div className={styles.studentGrid}>
              {students.map((student) => (
                <article key={student.id} className={styles.studentCard}>
                  <div className={styles.studentHeader}>
                    <div>
                      <h4>{student.name}</h4>
                      <p>{student.course}</p>
                    </div>
                    <span className={styles.studentBadge}>Student</span>
                  </div>

                  <dl className={styles.details}>
                    <div>
                      <dt>Email</dt>
                      <dd>{student.email}</dd>
                    </div>
                    <div>
                      <dt>Course</dt>
                      <dd>{student.course}</dd>
                    </div>
                  </dl>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => router.push(`/edit-student/${student.id}`)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStudent(student.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
