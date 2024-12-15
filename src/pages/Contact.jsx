/** @format */

// import React from "react";
import { useRef } from "react";
import Header from "../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_67w4fp1",
        "template_wv4o324",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      )
      .then(
        () => {
          toast.success("Thank you for contacting us!");
        },
        () => {
          toast.error("Please try again.");
        }
      );
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="py-12 ">
        <div className="px-4 mx-auto max-w-screen-md bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-6">
            Contact Us
          </h2>
          <p className="text-lg font-light text-center text-gray-700 mb-8 lg:mb-10">
            Have a question, comment, or concern? We would love to hear from
            you! Our team is dedicated to providing you with exceptional service
            and support.
          </p>
          <form ref={form} onSubmit={sendEmail} className="px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="form_label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  name="first_name"
                  className="form_input mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="form_label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  name="last_name"
                  className="form_input mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="form_label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="form_input mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="form_label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  placeholder="Phone number"
                  className="form_input mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="Phone_number"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="form_label">
                  Your Message
                </label>
                <textarea
                  rows="6"
                  id="message"
                  placeholder="Leave a message..."
                  className="form_input mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="message"
                  required></textarea>
              </div>
            </div>
            <div className="text-center mb-12">
              <button
                type="submit"
                className="btn px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
