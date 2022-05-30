import Navigation from "../components/Navigation";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jqq0ke6",
        "template_rraqekf",
        form.current,
        "V_itaO6_FgMhs0fH8"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          alert("Message Sent Successfully, We'll Get Back To You Soon");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
    >
      <Navigation />
      <br />
      <h2 className="heading">Contact Us</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <br />
        <div className="block">
          <label className="contact-label">Full Name: </label>
          <input
            className="contact-input"
            type="text"
            name="user_name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="block">
          <label className="contact-label">Email: </label>
          <input
            className="contact-input"
            type="email"
            name="user_email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="block">
          <label className="contact-label">Message: </label>
          <textarea
            className="contact-input"
            name="message"
            placeholder="What Would You Like To Tell Us?"
          />
        </div>
        <br />
        <input type="submit" value="Send" />
      </form>
    </motion.div>
  );
}
