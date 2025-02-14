import React, { useState, useEffect } from "react";
import RoomListHeader from "./RoomListHeader";
import RoomItem from "./RoomItem";

export default function RoomList(props) {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("id_asc"); 
    const itemsPerPage = 5; 

    useEffect(() => {
        if (Array.isArray(props.rooms)) {
            setRooms(props.rooms);
        } else {
            setRooms([]);
        }
    }, [props.rooms]);

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
    };

    const sortedRooms = [...rooms].sort((a, b) => {
        if (sortBy === "id_asc") return a.id - b.id;
        if (sortBy === "id_desc") return b.id - a.id;
        if (sortBy === "shortPrice_asc") return a.shortPrice - b.shortPrice;
        if (sortBy === "shortPrice_desc") return b.shortPrice - a.shortPrice;
        if (sortBy === "middlePrice_asc") return a.middlePrice - b.middlePrice;
        if (sortBy === "middlePrice_desc") return b.middlePrice - a.middlePrice;
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRooms = sortedRooms.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(rooms.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-3 p-3 bg-white shadow-lg rounded border">
            <RoomListHeader sortBy={sortBy} onSortChange={handleSortChange} />
            <div className="d-flex flex-column p-3 bg-light rounded shadow-sm">
                {currentRooms.length > 0 ? (
                    currentRooms.map((room) =>
                        room?.id ? (
                            <RoomItem
                                key={room.id}
                                room={room}
                                onRoomDeleted={props.onRoomDeleted}
                                onUpdate={props.onUpdate}
                            />
                        ) : null
                    )
                ) : (
                    <p className="text-center text-muted">部屋が見つかりません。</p>
                )}
            </div>

            {totalPages > 1 && (
                <nav className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={prevPage}>
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={nextPage}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
