import React, {useState, useEffect} from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import AddRoomModal from "./AddRoomModal";
import FilterRoomModal from "./FilterModal";

export default function Header(props) {
    const [show, setShow] = React.useState(false);
    const [roomsCount, setRoomsCount] = React.useState(props.roomsCount);
    const [showFilter, setShowFilter] = useState(false);
    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    useEffect(() => {
        setRoomsCount(props.roomsCount);
    }, [props.roomsCount]);

    return (
        <Container className="bg-light p-3 rounded">
            <Row className="align-items-center mb-2">
                <Col>
                <p className="text-primary m-0">
                    運営している全ての部屋を登録しましょう。
                </p>
                </Col>
                <Col className="text-end">
                <Button variant="primary" size="lg" onClick={showModal}>
                    + 部屋を追加
                </Button>
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col>
                <p className="fs-5 fw-semibold m-0">
                    部屋 <span className="fw-bold">{roomsCount}</span> 室
                </p>
                </Col>
                <Col className="text-end">
                <Button variant="outline-secondary" size="sm" onClick={() => setShowFilter(true)}>
                    🔍 絞り込み検索
                </Button>
                </Col>
            </Row>

            <AddRoomModal show={show} handleClose={hideModal} onRoomAdded={props.onRoomAdded}/>
            <FilterRoomModal 
                show={showFilter} 
                handleClose={() => setShowFilter(false)} 
                onFilter={props.onFilter} 
            />
        </Container>
    );
}
