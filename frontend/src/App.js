import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [registrations, setRegistrations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    event: "",
  });

  const API_URL = "/registrations";


  // Fetch Registrations
  const fetchRegistrations = async () => {
    const res = await axios.get(API_URL);
    setRegistrations(res.data);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);


  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(API_URL, formData);

    alert("Registration Successful!");

    setFormData({
      name: "",
      email: "",
      college: "",
      event: "",
    });

    fetchRegistrations();
  };


  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Online Event Registration
      </h1>


      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="college"
          placeholder="Enter College Name"
          value={formData.college}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="event"
          placeholder="Enter Event Name"
          value={formData.event}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

      </form>


      <h2 style={styles.subHeading}>
        Registered Participants
      </h2>


      {registrations.map((item) => (
        <div key={item._id} style={styles.card}>

          <h3>{item.name}</h3>

          <p>Email: {item.email}</p>

          <p>College: {item.college}</p>

          <p>Event: {item.event}</p>

        </div>
      ))}

    </div>
  );
}


const styles = {

  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  heading: {
    textAlign: "center",
    color: "#333",
  },

  subHeading: {
    marginTop: "40px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },

  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },

  card: {
    background: "white",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

};

export default App;