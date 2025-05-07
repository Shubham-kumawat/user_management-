import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    age: "",
    personalDetails: "",
    education: "",
    hairColor: "",
    eyeColor: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/create", form);
      alert(response.data.message || "Registered successfully!");
    } catch (err) {
      alert("Error registering user");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative px-4">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/User"
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </Link>
      </div>

      {/* Form Card */}
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="firstName"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                type="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Other fields */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="phone"
              placeholder="Your Phone"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="gender"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Date of Birth</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="dob"
              type="date"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="age"
              type="number"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="education" className="block text-sm font-medium text-gray-600">Education</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="education"
              placeholder="Your Education"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="hairColor" className="block text-sm font-medium text-gray-600">Hair Color</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="hairColor"
              placeholder="Enter your hair color"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-600">Eye Color</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="eyeColor"
              placeholder="Enter your eye color"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
