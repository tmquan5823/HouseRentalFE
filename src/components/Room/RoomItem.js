import React, {useState} from "react";
import { Dropdown } from "react-bootstrap";
import RoomDetailModal from "./RoomDetailModal";
import { useHttpClient } from "../../hooks/http-hook";
import ConfirmModal from "../UI/ConfirmModal";
import RoomUpdateModal from "./RoomUpdateModal";

export default function RoomItem(props) {
    const {sendRequest} = useHttpClient();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const deleteHandler = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/api/rooms/${props.room.id}`, "DELETE");
            props.onRoomDeleted(props.room.id);
            setShowConfirm(false);
        } catch (error) {
            console.error(error);
            alert("削除に失敗しました。");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center pt-4 pb-4 border-bottom">
                <div className="col-2 pe-5">
                    <img 
                        src={props.room.imageUrl} 
                        alt="room" 
                        className="img-fluid"
                    />
                </div>

                <div className="col flex-grow-1 pe-3">
                    <div className="fw-bold mb-2">{props.room.roomNumber}号室 {props.room.type && `| ${props.room.type}`}</div>
                    <div className="text-muted small mb-2">
                        ID: <span className="text-primary">{props.room.id}</span> | {props.room.address} | {props.room.name}
                    </div>
                    <div className="text-muted small">{props.room.manager}</div>
                </div>

                <div className="d-flex col-2 pe-3 justify-content-between">
                    <div>
                        <span className="text-muted small">ショート</span>
                        <div className="fw-bold">{props.room.shortPrice}円/日</div>
                    </div>
                    <div>
                        <span className="text-muted small">ミドル</span>
                        <div className="fw-bold">{props.room.middlePrice}円/月</div>
                    </div>
                </div>  

                <div className="col-1 text-center">
                    <span className="text-primary fw-bold">{props.room.status}</span>
                </div>

                <div className="d-flex col-1 text-center">
                    <button 
                        onClick={() => setSelectedRoom(props.room)}
                        className="btn btn-outline-primary btn-sm me-2 ms-2">詳細</button>
                     <div className="col-1 text-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" size="sm" className="border-0">
                            <span className="fw-bold">⋮</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>setShowUpdateModal(true)} >📝 更新</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowConfirm(true)} className="text-danger">🗑️ 削除</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                </div> 
            </div>
            {selectedRoom && (
                <RoomDetailModal 
                    show={!!selectedRoom}
                    handleClose={() => setSelectedRoom(null)}
                    room={selectedRoom}
                />)}
            {showUpdateModal && (
                <RoomUpdateModal
                    show={showUpdateModal}
                    handleClose={() => setShowUpdateModal(false)}
                    room={props.room}
                    onUpdate={props.onUpdate}
            />)}

            <ConfirmModal 
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                handleConfirm={deleteHandler}
                title="削除確認"
                message="この部屋を削除してもよろしいですか？"
            />
        </div>
        
    )
};