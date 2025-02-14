import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useHttpClient } from "../../hooks/http-hook";

export default function RoomUpdateModal({ show, handleClose, room, onUpdate }) {
    const { isLoading, sendRequest } = useHttpClient();
    const [selectedFile, setSelectedFile] = useState(null);
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        if (room) {
            setRoomData({ ...room, status: "公開中" }); 
        }
    }, [room]);

    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        for (const key in roomData) {
            if (!roomData[key]) {
                alert("すべてのフィールドを入力してください。");
                return;
            }
        }
    
        try {
            const formData = new FormData();
            Object.keys(roomData).forEach((key) => {
                formData.append(key, roomData[key]);
            });
            if (selectedFile) {
                formData.append("file", selectedFile);
            }
    
            const response = await sendRequest(
                `${process.env.REACT_APP_API_URL}/api/rooms/${room.id}`,
                "PUT",
                formData,
                {"Content-Type": "multipart/form-data"}
            );
            onUpdate(response);
            handleClose();
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>部屋を更新</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>部屋の写真</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        {selectedFile ? (
                            <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-2" style={{ width: "100px", borderRadius: "5px" }} />
                        ) : (
                            room.imageUrl && <img src={room.imageUrl} alt="Room" className="mt-2" style={{ width: "100px", borderRadius: "5px" }} />
                        )}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>部屋名</Form.Label>
                                <Form.Control type="text" name="name" value={roomData.name || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>住所</Form.Label>
                                <Form.Control type="text" name="address" value={roomData.address || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>部屋番号</Form.Label>
                                <Form.Control type="text" name="roomNumber" value={roomData.roomNumber || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>タイプ</Form.Label>
                                <Form.Control type="text" name="type" value={roomData.type || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>短期価格</Form.Label>
                                <Form.Control type="number" name="shortPrice" value={roomData.shortPrice || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>中期価格</Form.Label>
                                <Form.Control type="number" name="middlePrice" value={roomData.middlePrice || ""} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>管理者</Form.Label>
                        <Form.Control type="text" name="manager" value={roomData.manager || ""} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={isLoading}>キャンセル</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                    更新
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
