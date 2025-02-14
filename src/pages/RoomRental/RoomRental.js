import React, { useState, useEffect } from "react";
import Header from "../../components/Room/Header";
import RoomList from "../../components/Room/RoomList";
import { useHttpClient } from "../../hooks/http-hook";

const RoomRental = () => {
  const { sendRequest } = useHttpClient();
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "", type: "" });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (queryParams = "") => {
    try {
      const url = `http://localhost:8080/api/rooms/filter${queryParams ? `?${queryParams}` : ""}`;
      const response = await sendRequest(url);
      setRooms(response);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  
  const onFilter = (filterData) => {
    setFilters(filterData);
    const queryParams = Object.entries(filterData)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  
    fetchRooms(queryParams);
  };

  const onRoomAdded = (room) => setRooms([...rooms, room]);

  const onRoomDeleted = (roomId) => setRooms(rooms.filter((room) => room.id !== roomId));

  const onRoomUpdated = (updatedRoom) => {
    setRooms(rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)));
  };

  return (
    <div className="container">
      <Header roomsCount={rooms.length} onRoomAdded={onRoomAdded} onFilter={onFilter} />
      <RoomList rooms={rooms} onRoomDeleted={onRoomDeleted} onUpdate={onRoomUpdated} />
    </div>
  );
};

export default RoomRental;
