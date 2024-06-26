import React, { useEffect, useState } from "react";
import useRooms from "../../../hooks/useRooms";

const RoomList = () => {
  const { rooms, loading, error } = useRooms("/data/rooms.json");
  const [selectedRoomType, setSelectedRoomType] = useState("All rooms");
  const [selectedRoomAvailability, setSelectedRoomAvailability] =
    useState("All availability");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  const filterRooms = () => {
    return rooms.filter((room) => {
      const typeMatches =
        selectedRoomType === "All rooms" || room.category === selectedRoomType;
      const availabilityMatches =
        selectedRoomAvailability === "All availability" ||
        (selectedRoomAvailability === "isAvailable" && room.isAvailable) ||
        (selectedRoomAvailability === "isNotAvailable" && !room.isAvailable);
      return typeMatches && availabilityMatches;
    });
  };

  const filteredRooms = filterRooms();

  return (
    <div className="flex flex-col">
      <header className="my-10 flex flex-col">
        <div className="flex gap-5 mb-5">
          <select
            name="roomType"
            id="roomType"
            onChange={handleRoomTypeChange}
            className="p-2 w-full max-w-sm h-10 rounded-md mx-auto bg-white"
          >
            <option value="All rooms">All rooms</option>
            <option value="single">Single rooms</option>
            <option value="double">Double rooms</option>
          </select>
          <select
            name="roomAvailability"
            id="roomAvailability"
            onChange={handleRoomAvailabilityChange}
            className="p-2 w-full max-w-sm h-10 rounded-md mx-auto bg-white "
          >
            <option value="All availability">All availability</option>
            <option value="isAvailable">Available</option>
            <option value="isNotAvailable">Not available</option>
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="bg-blue-500 text-white px-2 py-2 rounded-md mx-auto hover:bg-blue-700 "
        >
          Reset Filters
        </button>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-5 ">
        {filteredRooms.map((room) => (
          <li
            key={room.id}
            className="group mx-auto capitalize cursor-pointer "
          >
            <div className="text-center">{room.price}Kr</div>
            {room.isAvailable ? (
              <>
                <div className="bg-green-400 h-24 w-24 p-1 rounded-md justify-center flex flex-col items-center group-hover:border-4 border-solid border-white">
                  <span>Room: {room.roomNumber}</span>
                  <span>{room.category}</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-red-400 h-24 w-24 p-1 rounded-md justify-center flex flex-col items-center group-hover:border-4 border-solid border-white">
                  <span>Room: {room.roomNumber}</span>
                  <span>{room.category}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
