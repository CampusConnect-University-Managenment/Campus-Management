import React, { useState } from "react";

const Announcements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = (e) => {  
    e.preventDefault();

    const announcementData = {
      title,
      message,
      course,
      postedAt: new Date().toLocaleString(),
    };

    console.log("✅ Announcement Submitted:", announcementData);

    // Clear form
    setTitle("");
    setMessage("");
    setCourse("");
  };

  return (
    <div style={styles.container}>
      <h2>Post Course Announcement</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Course</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select a course</option>
          <option value="CSE101">CSE101 - Data Structures</option>
          <option value="CSE102">CSE102 - Java Programming</option>
          <option value="CSE103">CSE103 - Web Technologies</option>
        </select>

        <label style={styles.label}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter announcement title"
          style={styles.input}
        />

        <label style={styles.label}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Enter detailed message"
          style={{ ...styles.input, height: "100px" }}
        ></textarea>

        <button type="submit" style={styles.button}>Post Announcement</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Announcements;