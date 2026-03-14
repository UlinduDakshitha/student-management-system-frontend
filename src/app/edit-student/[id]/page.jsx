"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "../../../services/api";
import Navbar from "../../../components/Navbar";

export default function EditStudentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    API.get(`/students/${id}`)
      .then((res) => {
        if (isMounted) {
          setForm(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to load student");
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/students/${id}`, {
        name: form.name,
        email: form.email,
        course: form.course,
      });

      alert("Student updated");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Edit Student</h2>

      <form onSubmit={updateStudent}>
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

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}
