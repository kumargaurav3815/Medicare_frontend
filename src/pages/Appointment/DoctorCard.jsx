/** @format */

import PropTypes from "prop-types"; // Import PropTypes

const DoctorCard = ({ imgSrc, alt, name, specialty }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <img
        src={imgSrc}
        alt={alt}
        className="mb-4 rounded-full w-32 h-32 object-cover"
      />
      <h3 className="text-[22px] font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-500">{specialty}</p>
    </div>
  );
};

// Add PropTypes for validation
DoctorCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
};

export default DoctorCard;
