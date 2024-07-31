import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

/**
 * 
 * @param {{
 *   room: {
 *    roomNumber: number
 *    category: string
 *    price: number
 *    isAvailable: boolean
 *    bookings: {
 *      customer: string
 *      startDate: string
 *      endDate: string
 *    }[]
 *  }
 *  hideBookingDetails: () => void  
 * }} props
 * @returns 
 */
const RoomDetails = ({ room, hideBookingDetails }) => {
  const navigate = useNavigate();

  const handleBookingClick = (roomData) => {
    navigate(`/booking?booking=${roomData}`);
  };

  if (!room) {
    return null;
  }

  return (
    <div className="flex flex-col sm:mt-10 p-3 border rounded-md z-10 fixed top-0 left-0 right-0 mx-auto bg-white max-w-4xl shadow sm:absolute h-full sm:h-64">
      <header className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Room Details</h2>
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          className="ms-auto cursor-pointer"
          onClick={() => hideBookingDetails()}
        />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col capitalize gap-2">
          <p>
            <strong>Room Number:</strong> {room.roomNumber}
          </p>
          <p>
            <strong>Category:</strong> {room.category}
          </p>
          <p>
            <strong>Price:</strong> {room.price}Kr per day
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {room.isAvailable ? "Available" : "Not Available"}
          </p>
          {room.isAvailable ? (
            <Link
              to={`/booking?booking=${encodeURIComponent(
                JSON.stringify(room)
              )}`}
              className="bg-blue-500 text-center text-white p-2 rounded-md mt-2 mb-2 w-36"
            >
              Book this room
            </Link>
          ) : (
            <div
              className="bg-gray-400 text-center text-white p-2 rounded-md mt-2 mb-2 w-44 cursor-not-allowed"
              aria-disabled="true"
            >
              Booking not available
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Bookings</h3>
          {room.bookings.length > 0 ? (
            <ul className="sm:h-40 sm:max-h-40 overflow-y-scroll">
              {room.bookings.map((booking, index) => (
                <li key={index} className="mb-5 bg-gray-200 p-2 rounded-md">
                  <p>
                    <strong>Customer:</strong> {booking.customer}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {booking.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {booking.endDate}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this room.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
