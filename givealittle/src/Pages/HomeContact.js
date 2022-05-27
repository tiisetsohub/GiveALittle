import Navigation from "../components/HomeNavBar";
import HomeNavBar from "../components/HomeNavBar";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function HomeContact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_z2ky82v', 'template_j0a2bot', form.current, 'WQW9l5NT67mT0P5kn')
      .then((result) => {
          console.log(result.text);
          e.target.reset();
          alert("Message Sent Successfully, We'll Get Back To You Soon")
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
      <HomeNavBar />
      <br />
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
