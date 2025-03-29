'use client'
import Image from "next/image";
import Navbar from "../../components/navbar";
import styles from "../../styles/home.module.css";
import { Gabarito } from "next/font/google";
import Link from "next/link";
import getUserData from "@/app/api/index";
import { useState } from "react";

const gabarito = Gabarito({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [professor, setProfessor] = useState("");
  const [location, setLocation] = useState("");

  // In your page.js file

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build the data object from your form state
      const formData = {
        university,
        subject: course, // adjust accordingly if "course" represents "subject"
        course: courseNumber,
        professor,
        location,
      };
  
      const res = await fetch("/api/add-to-notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add data to Notion");
      }
  
      const data = await res.json();
      console.log("Notion API Response:", data);
      // Optionally, clear the form or provide feedback to the user here
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.textContainerPost}>
          <p className={`${styles.textPost} ${gabarito.className}`}>Never miss another exam</p>
          <p className={styles.textSubPost}>Fill in the exam information to make a post to the board</p>
        </div>
        <div className={styles.divForm}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="University"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Course Number"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
