import React, { useState } from "react";
import {
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";
const PaymentForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      post_code: "",
    },
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      axios
        .post(
          "https://api.escrow.com/2017-09-01/customer",
          JSON.stringify(formData),
          {
            headers: {
              "Content-Type": "application/json",
            },
            auth: {
              username: "divyanshum3232@gmail.com",
              password:
                "17255_26pQ8L8xqNAsD4t0fxYCinRxHCIiSIfqxFWxz1e30wz6fZdF6TgXcHDEBpEIsVcE",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      //   if (response.ok) {
      //     const responseData = await response.json();
      //     console.log('Payment processed successfully:', responseData);
      //   } else {
      //     console.error('Error processing payment:', response.statusText);
      //   }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/63Z_2112.w012.n001.19C.p6.19.jpg')" }}
      >
        <div className="flex flex-col justify-center h-full p-10 bg-black bg-opacity-50">
          <h2 className="text-6xl font-bold text-white mb-4">SECURE PAYMENT</h2>
          <p className="text-lg text-gray-300">
            Your payment information is encrypted and secure.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-1/2 flex justify-center items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Payment Information
          </h1>

          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              placeholder="Middle Name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.line2"
              value={formData.address.line2}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="address.post_code"
              value={formData.address.post_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
