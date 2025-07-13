/** @format */

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiCalendar, FiClock, FiMail } from "react-icons/fi";
import Header from "../components/Header/Header";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isAppointments, setIsAppointments] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/getAppointments");
      setAppointments(response.data.appointments);
      setFilteredData(response.data.appointments);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/getConsultations");
      setConsultations(response.data.consultations);
      setFilteredData(response.data.consultations);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch consultations."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = (isAppointments ? appointments : consultations).filter(
      (item) => item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

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
        return new Date(a.appointmentDate) >= today ? -1 : 1;
      } else if (criteria === "past") {
        return new Date(a.appointmentDate) < today ? -1 : 1;
      }
      return 0;
    });

    setFilteredData(sorted);
  };

  const handleButtonClick = (type) => {
    setIsAppointments(type === "appointments");
    type === "appointments" ? fetchAppointments() : fetchConsultations();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "No Date";

  const getStatusBadge = (date) => {
    const today = new Date();
    const d = new Date(date);
    return d >= today ? "Upcoming" : "Past";
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleButtonClick("appointments")}
            className={`px-6 py-2 rounded-full font-medium transition duration-300 shadow-md ${
              isAppointments
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}>
            My Appointments
          </button>
          <button
            onClick={() => handleButtonClick("consultations")}
            className={`px-6 py-2 rounded-full font-medium transition duration-300 shadow-md ${
              !isAppointments
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}>
            My Consultations
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            onChange={handleSort}
            value={sortBy}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Cards */}
        {loading ? (
          <p className="text-center text-gray-500">⏳ Loading...</p>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl shadow-xl border border-gray-100 bg-white/60 backdrop-blur-lg transition hover:scale-[1.02] hover:shadow-2xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-blue-800">
                    {item.name}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold ${
                      getStatusBadge(item.appointmentDate) === "Upcoming"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {getStatusBadge(item.appointmentDate)}
                  </span>
                </div>
                <p className="text-sm flex items-center gap-2 text-gray-600">
                  <FiMail /> {item.email}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-600">
                  <FiCalendar /> {formatDate(item.appointmentDate)}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-600">
                  <FiClock /> {item.appointmentTime || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">No records found.</p>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default MyAppointments;
