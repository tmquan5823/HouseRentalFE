import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterRoomModal({ show, handleClose, onFilter }) {
    const [filters, setFilters] = useState({
        name: "",
        address: "",
        type: "",
        manager: "",
        shortPrice: [0, 5000], 
        middlePrice: [30000, 150000], 
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleShortPriceChange = (value) => {
        setFilters({ ...filters, shortPrice: value });
    };

    const handleMiddlePriceChange = (value) => {
        setFilters({ ...filters, middlePrice: value });
    };

    const handleApplyFilter = () => {
        onFilter(filters);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>部屋をフィルター</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>部屋名</Form.Label>
                                <Form.Control type="text" name="name" value={filters.name} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>住所</Form.Label>
                                <Form.Control type="text" name="address" value={filters.address} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>タイプ</Form.Label>
                                <Form.Control type="text" name="type" value={filters.type} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>マネージャー</Form.Label>
                                <Form.Control type="text" name="manager" value={filters.manager} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>短期価格 (円/時間または日)</Form.Label>
                        <Slider
                            range
                            min={0}
                            max={10000}
                            step={100}
                            value={filters.shortPrice}
                            onChange={handleShortPriceChange}
                        />
                        <div className="mt-2">
                            <span>{filters.shortPrice[0]}円</span> - <span>{filters.shortPrice[1]}円</span>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>中期価格 (円/月)</Form.Label>
                        <Slider
                            range
                            min={10000}
                            max={1000000}
                            step={1000}
                            value={filters.middlePrice}
                            onChange={handleMiddlePriceChange}
                        />
                        <div className="mt-2">
                            <span>{filters.middlePrice[0]}円</span> - <span>{filters.middlePrice[1]}円</span>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>キャンセル</Button>
                <Button variant="primary" onClick={handleApplyFilter}>適用</Button>
            </Modal.Footer>
        </Modal>
    );
}
