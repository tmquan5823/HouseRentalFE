import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, handleConfirm, title, message, isLoading }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                    キャンセル
                </Button>
                <Button variant="danger" onClick={handleConfirm} disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : "削除"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
