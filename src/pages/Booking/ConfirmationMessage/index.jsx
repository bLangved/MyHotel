import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationMessage = ({
  customer,
  roomNumber,
  startDate,
  endDate,
  totalPrice,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
        <p>Thank you {customer}!</p>
        <p>
          Your booking for room {roomNumber} from {startDate} to {endDate} has
          been confirmed.
        </p>
        <p>Total price is {totalPrice}Kr.</p>
        <p>You will be redirected to the homepage in 5 seconds.</p>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
