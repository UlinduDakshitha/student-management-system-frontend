"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  const router = useRouter();

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
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Dashboard</h2>

      <h3>Add Student</h3>
      <form onSubmit={addStudent}>
        <input
          type="text"
          name="name"
          placeholder="Student name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Student email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="course"
          placeholder="Student course"
          value={form.course}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Add Student</button>
      </form>

      <hr />

      <h3>Student List</h3>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Course:</strong> {student.course}
            </p>

            <button onClick={() => router.push(`/edit-student/${student.id}`)}>
              Edit
            </button>

            <button
              onClick={() => deleteStudent(student.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
