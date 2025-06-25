import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/api/contact", form);
      setSubmitted(true);
    } catch (err) {
      console.error("❌ Failed to submit feedback:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for contacting us, We will send you a responce soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for contact"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your issue or message"
            rows="4"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
