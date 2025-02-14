import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useHttpClient } from "../../hooks/http-hook";

export default function AddRoomModal({ show, handleClose, onRoomAdded }) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [selectedFile, setSelectedFile] = useState(null);
    const [roomData, setRoomData] = useState({
        name: "",
        address: "",
        roomNumber: "",
        shortPrice: "",
        middlePrice: "",
        type: "",
        manager: "",  
    });

    useEffect(() => {
      if (!show) {
        setRoomData({
          name: "",
          address: "",
          roomNumber: "",
          shortPrice: "",
          middlePrice: "",
          type: "",
          manager: "",
        });
        setSelectedFile(null);
      }
    }, [show]);

    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const requiredFields = ["name", "address", "roomNumber", "shortPrice", "middlePrice", "type", "manager"];
        for (const field of requiredFields) {
            if (!roomData[field].trim()) {
                alert("すべての項目を入力してください。");
                return;
            }
        }

        try {
            const formData = new FormData();
            Object.keys(roomData).forEach((key) => {
                formData.append(key, roomData[key]);
            });
            formData.append("status", "公開中");
            if (selectedFile) {
                formData.append("file", selectedFile);
            }
    
            const response = await sendRequest(process.env.REACT_APP_API_URL + "/api/rooms", "POST", formData, {
                "Content-Type": "multipart/form-data"
            });
    
            onRoomAdded(response);
            handleClose();
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };    
    

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>部屋を追加</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>部屋の写真</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-2" style={{ width: "100px", borderRadius: "5px" }} />}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>部屋名</Form.Label>
                                <Form.Control type="text" name="name" value={roomData.name} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>住所</Form.Label>
                                <Form.Control type="text" name="address" value={roomData.address} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>部屋番号</Form.Label>
                                <Form.Control type="text" name="roomNumber" value={roomData.roomNumber} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>タイプ</Form.Label>
                                <Form.Control type="text" name="type" value={roomData.type} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>短期価格</Form.Label>
                                <Form.Control type="number" name="shortPrice" value={roomData.shortPrice} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>中期価格</Form.Label>
                                <Form.Control type="number" name="middlePrice" value={roomData.middlePrice} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>マネージャー</Form.Label>
                        <Form.Control type="text" name="manager" value={roomData.manager} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>キャンセル</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            追加中...
                        </>
                    ) : (
                        "追加"
                    )}
                </Button>

            </Modal.Footer>
        </Modal>
    );
}