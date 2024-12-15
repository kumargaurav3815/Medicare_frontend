/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header/Header";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isAppointments, setIsAppointments] = useState(true);

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/getAppointments",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(response.data.appointments);
      setFilteredData(response.data.appointments);
    } catch (err) {
      toast.error("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Consultations
  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/getConsultations",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConsultations(response.data.consultations);
      setFilteredData(response.data.consultations);
    } catch (err) {
      toast.error("Failed to fetch consultations.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = (isAppointments ? appointments : consultations).filter(
      (item) => item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Sort Data
  const handleSort = (e) => {
    const criteria = e.target.value;
    setSortBy(criteria);

    const today = new Date();

    const sorted = [...filteredData].sort((a, b) => {
      if (criteria === "date") {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate);
      } else if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "upcoming") {
        // Upcoming appointments appear first
        const aIsUpcoming = new Date(a.appointmentDate) >= today;
        const bIsUpcoming = new Date(b.appointmentDate) >= today;
        return aIsUpcoming === bIsUpcoming ? 0 : aIsUpcoming ? -1 : 1;
      } else if (criteria === "past") {
        // Past appointments appear first
        const aIsPast = new Date(a.appointmentDate) < today;
        const bIsPast = new Date(b.appointmentDate) < today;
        return aIsPast === bIsPast ? 0 : aIsPast ? -1 : 1;
      }
      return 0;
    });

    setFilteredData(sorted);
  };

  // Button Click
  const handleButtonClick = (type) => {
    setIsAppointments(type === "appointments");
    type === "appointments" ? fetchAppointments() : fetchConsultations();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Format Date
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "No Date";

  // Get Status Badge
  const getStatusBadge = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    return appointmentDate >= today ? "Upcoming" : "Past";
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleButtonClick("appointments")}
            className={`px-4 py-2 rounded ${
              isAppointments ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}>
            My Appointments
          </button>
          <button
            onClick={() => handleButtonClick("consultations")}
            className={`px-4 py-2 rounded ${
              !isAppointments ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}>
            My Consultations
          </button>
        </div>

        {/* Search and Sort */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded w-full max-w-sm"
          />
          <select
            onChange={handleSort}
            value={sortBy}
            className="px-4 py-2 border rounded">
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="upcoming">Sort by Upcoming</option>
            <option value="past">Sort by Past</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow bg-white">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      getStatusBadge(item.appointmentDate) === "Upcoming"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}>
                    {getStatusBadge(item.appointmentDate)}
                  </span>
                </div>
                <p className="text-sm">Email: {item.email}</p>
                <p className="text-sm">
                  Date: {formatDate(item.appointmentDate)}
                </p>
                <p className="text-sm">Time: {item.appointmentTime || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No records found.</p>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default MyAppointments;
