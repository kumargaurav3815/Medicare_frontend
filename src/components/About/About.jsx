/** @format */

import aboutImg from "../../assets/images/d4.png";

const About = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <img
              src={aboutImg}
              alt="About Us"
              className="w-full rounded-lg shadow-xl object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Proud to be one of the nation's best.
            </h2>
            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              At the heart of every successful recovery and life-changing
              diagnosis is a team of highly skilled, compassionate professionals
              who dedicate their lives to advancing healthcare. Our medical team
              is proud to be recognized among the nation’s best, offering a
              blend of expertise, innovation, and personalized care that sets us
              apart. From doctors and nurses to specialists and support staff,
              every member of our team works tirelessly to ensure the highest
              standards of patient care. <br /> <br />
              What truly makes us exceptional is our commitment to going beyond
              just treatment. We focus on understanding the unique needs of each
              patient and crafting a care plan that ensures not only better
              outcomes but also an improved quality of life. Through
              collaboration, research, and a shared passion for healing, we
              continue to push boundaries, delivering excellence at every turn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
