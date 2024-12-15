/** @format */

// import React from "react";
import { services } from "../../assets/data/services";
import ServicesCard from "./ServicesCard";
const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[30px] mt-[30px] lg:mt-[55px] animate-fadeIn">
      {services.map((item, index) => (
        <ServicesCard item={item} index={index} key={index} />
      ))}
    </div>
  );
};

export default ServicesList;
