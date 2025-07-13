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

      {/* SERVICES PREVIEW */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Providing the Best Medical Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            We deliver quality, compassion, and commitment with every visit.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: icon03, title: "Book an Appointment" },
              { icon: icon04, title: "Review Your Health" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow hover:shadow-xl transition-all text-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert support, 24/7 availability, and seamless health
                  tracking.
                </p>
                <Link
                  to="/appointment"
                  aria-label="Go to appointment page"
                  className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <BsArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIRTUAL CONSULTATION */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Get virtual treatment anytime.
            </h2>
            <ul className="list-disc pl-6 text-gray-700 text-lg space-y-3 mb-6">
              <li>Book directly through our secure platform.</li>
              <li>Speak with licensed doctors online.</li>
              <li>Get prescriptions without leaving your home.</li>
            </ul>
            <Link to="/virtualAppointment">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition">
                Book Online Consultation
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={featureImg}
              alt="Virtual treatment"
              className="rounded-xl w-full max-w-md shadow-lg hover:shadow-2xl transition"
            />
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Medical Services
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Full spectrum of care – from general consultation to chronic disease
            management.
          </p>
          <ServicesList />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <About />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <img
              src={faqImg}
              alt="Frequently asked questions"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
