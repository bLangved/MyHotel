import React, { useEffect, useMemo, useState } from "react";
import useRooms from "../../../hooks/useRooms";
import RoomDetails from "./RoomDetails";

const RoomList = () => {
  const { rooms, fetchRooms, loading, error } = useRooms("/data/rooms.json");
  const [selectedRoomType, setSelectedRoomType] = useState("All rooms");
  const [selectedRoomAvailability, setSelectedRoomAvailability] =
    useState("All availability");
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const handleRoomAvailabilityChange = (e) => {
    setSelectedRoomAvailability(e.target.value);
  };

  const resetFilters = () => {
    setSelectedRoomType("All rooms");
    setSelectedRoomAvailability("All availability");
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const typeMatches =
        selectedRoomType === "All rooms" || room.category === selectedRoomType;
      const availabilityMatches =
        selectedRoomAvailability === "All availability" ||
        (selectedRoomAvailability === "isAvailable" && room.isAvailable) ||
        (selectedRoomAvailability === "isNotAvailable" && !room.isAvailable);
      return typeMatches && availabilityMatches;
    });
  }, [rooms, selectedRoomType, selectedRoomAvailability]);

  const showBookingDetails = (roomData) => {
    setBookingDetails(roomData);
  };
  const hideBookingDetails = () => {
    setBookingDetails(null);
  };

  const BookingDetails = () => {
    if(!bookingDetails)
      return (<></>)
    
    return (
      <RoomDetails
        room={bookingDetails}
        hideBookingDetails={hideBookingDetails}
      />
    )
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchRooms(signal).catch(e => console.error(e))

    return () => {
      controller.abort()
    }
  }, [fetchRooms])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col relative pb-3">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-semibold">MyHotel</h1>
        <p className="text-xl">Booking system</p>
      </div>
      <header className="my-10 flex flex-col gap-3 mx-auto w-52">
        <select
          name="roomType"
          id="roomType"
          onChange={handleRoomTypeChange}
          className="p-2 max-w-sm h-10 rounded-md bg-white"
        >
          <option value="All rooms">All rooms</option>
          <option value="single">Single rooms</option>
          <option value="double">Double rooms</option>
        </select>
        <select
          name="roomAvailability"
          id="roomAvailability"
          onChange={handleRoomAvailabilityChange}
          className="p-2 max-w-sm h-10 rounded-md bg-white "
        >
          <option value="All availability">All availability</option>
          <option value="isAvailable">Available</option>
          <option value="isNotAvailable">Not available</option>
        </select>

        <button
          onClick={resetFilters}
          className="bg-blue-500 max-w-sm text-white px-2 py-2 rounded-md hover:bg-blue-700 "
        >
          Reset Filters
        </button>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-5 ">
        {filteredRooms.map((room) => (
          <li
            key={room.id}
            className="group mx-auto capitalize cursor-pointer"
            onClick={() => showBookingDetails(room)}
          >
            <div className="text-center">{room.price}Kr</div>
              <>
                <div className={`${room.isAvailable ? 'bg-green-400' : 'bg-red-400'} h-24 w-24 p-1 rounded-md justify-center flex flex-col items-center group-hover:border-4 border-solid border-white`}>
                  <span>Room: {room.roomNumber}</span>
                  <span>{room.category}</span>
                </div>
              </>
          </li>
        ))}
      </ul>
      <BookingDetails />
    </div>
  );
};

export default RoomList;
