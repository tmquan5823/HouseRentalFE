import React from "react";
import { Modal, Button } from "react-bootstrap";

const RoomDetailModal = ({ show, handleClose, room }) => {
    if (!room) return null;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>部屋の詳細情報</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-3">
                    <img 
                        src={room.imageUrl} 
                        alt="Room" 
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <p><strong>部屋番号:</strong> {room.roomNumber}号室</p>
                <p><strong>タイプ:</strong> {room.type}</p>
                <p><strong>部屋名:</strong> {room.name}</p>
                <p><strong>住所:</strong> {room.address}</p>
                <p><strong>オーナー:</strong> {room.manager}</p>
                <p><strong>ショート料金:</strong> {room.shortPrice}円/日</p>
                <p><strong>ミドル料金:</strong> {room.middlePrice}円/月</p>
                <p><strong>状況:</strong> {room.status}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoomDetailModal;
