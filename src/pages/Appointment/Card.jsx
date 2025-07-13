/** @format */

// import React from "react";
import PropTypes from "prop-types";

const Card = ({ image, title, price, link }) => {
  return (
    <div className="flex-shrink-0 w-1/4   bg-[#F5F7F8] p-4 m-2 rounded-lg shadow-lg h-80 flex flex-col justify-center items-center">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover rounded-full"
      />
      <h3 className="text-xl font-semibold text-center mt-4">{title}</h3>
      <p className="text-center text-gray-700 mt-2">₹{price}</p>
      <a
        href={link}
        className="text-center text-blue-500 mt-4 block font-extrabold">
        Consult now &rarr;
      </a>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
