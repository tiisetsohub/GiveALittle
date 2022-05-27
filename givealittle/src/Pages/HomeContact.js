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
      <h2 className="heading">Contact Us</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <br/>
        <div className="block">
          <label className="contact-label">Full Name: </label>
          <input className="contact-input" type="text" name="user_name" placeholder="Enter Your Name" />
        </div>
        <div className="block">
          <label className="contact-label">Email: </label>
          <input className="contact-input" type="email" name="user_email" placeholder="Enter Your Email" />
        </div>
        <div className="block">
          <label className="contact-label" >Message: </label>
          <textarea className="contact-input" name="message" placeholder="What Would You Like To Tell Us?" />
        </div>
        <br/>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
