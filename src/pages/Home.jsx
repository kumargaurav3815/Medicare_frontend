/** @format */

import { useEffect } from "react";
import heroImg01 from "../assets/images/d1.png";
import icon03 from "../assets/images/icon03.png";
import icon04 from "../assets/images/icon04.png";
import featureImg from "../assets/images/d2.webp";
import faqImg from "../assets/images/faq-img.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import FaqList from "../components/Faq/FaqList";
import ServicesList from "../components/Services/ServicesList";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const Home = () => {
  const navigate = useNavigate("/login");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return (
    <>
      <Header />

      <section className="hero_section pt-[60px] bg-gradient-to-r from-blue-100 to-blue-300 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-opacity-30 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/path/to/your/background.jpg")',
          }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-[60px] items-center justify-between">
            <div className="lg:w-[570px] text-center lg:text-left">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-bold md:text-[50px] md:leading-[60px] mb-4">
                We help patients live a healthy, longer life.
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                Helping patients live healthier and longer lives can encompass a
                wide range of healthcare activities, from preventive care and
                education to diagnosis, treatment, and ongoing support.
              </p>
              <Link to="/appointment">
                <button className="btn mt-6 transition-transform transform hover:scale-105">
                  Request an Appointment
                </button>
              </Link>
            </div>

            <div className="w-full lg:w-1/2">
              <img
                className="w-full rounded-lg object-cover shadow-xl transform transition-transform hover:scale-105"
                src={heroImg01}
                alt="Healthy Life"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Providing the Best Medical Services
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              World-class care for everyone. Our health system offers unmatched,
              expert healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-xl rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={icon03}
                alt="Book an Appointment"
                className="w-20 h-20 mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800">
                Book an Appointment
              </h3>
              <p className="text-gray-600 mt-3">
                World-class care for everyone. Our health system offers
                unmatched, expert healthcare.
              </p>
              <Link
                to="/appointment"
                className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 shadow-md">
                <BsArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={icon04}
                alt="Review Your Health"
                className="w-20 h-20 mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800">
                Review Your Health
              </h3>
              <p className="text-gray-600 mt-3">
                World-class care for everyone. Our health system offers
                unmatched, expert healthcare.
              </p>
              <Link
                to="/appointment"
                className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 shadow-md">
                <BsArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-200 to-blue-400 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                Get virtual treatment anytime.
              </h2>
              <ul className="list-disc list-inside text-lg text-white/90 mb-8">
                <li>Schedule the appointment directly.</li>
                <li>Search your physician here, and contact their office.</li>
                <li>
                  Use the online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/virtualAppointment">
                <button className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Schedule an Appointment
                </button>
              </Link>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <img
                src={featureImg}
                alt="Virtual Treatment"
                className="w-[80%] max-w-md object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Our Medical Services
          </h2>
          <p className="text-center text-lg text-gray-600 mt-4 mb-10">
            World-class care for everyone. Our health system offers unmatched,
            expert healthcare.
          </p>
          <ServicesList />
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <About />
      </section>

      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 hidden md:block">
              <img
                src={faqImg}
                alt="FAQ"
                className="w-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800">
                Most questions by our beloved patients.
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
