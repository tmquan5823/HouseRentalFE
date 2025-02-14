import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, handleConfirm, title, message }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    キャンセル
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    削除
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
