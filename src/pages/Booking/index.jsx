import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConfirmationMessage from "./ConfirmationMessage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Booking = () => {
  const query = useQuery();
  const booking = JSON.parse(decodeURIComponent(query.get("booking")));
  const [formData, setFormData] = useState({
    customer: "",
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * booking.price);
    } else {
      setTotalPrice(0);
    }
  }, [formData.startDate, formData.endDate, booking.price]);

  if (showConfirmation) {
    return (
      <ConfirmationMessage
        customer={formData.customer}
        roomNumber={booking.roomNumber}
        startDate={formData.startDate}
        endDate={formData.endDate}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <div className="mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">
        Booking for Room {booking.roomNumber}
      </h1>
      <p>
        <strong>Category:</strong> {booking.category}
      </p>
      <p>
        <strong>Price:</strong> {booking.price}Kr per day
      </p>
      <p>
        <strong>Total:</strong> {totalPrice}Kr
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="customer" className="block text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
