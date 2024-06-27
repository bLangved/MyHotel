import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Booking = () => {
  const query = useQuery();
  const booking = JSON.parse(decodeURIComponent(query.get("booking")));

  return (
    <div>
      <h1>Room Page {booking.roomNumber}</h1>
      <p>Room ID: {booking.price}</p>
    </div>
  );
};

export default Booking;
