import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const DialogModal = ({ isOpen, onClose, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Error Message"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="modal-header">
                <h2>Error</h2>
                <button className="modal-close" onClick={onClose}>X</button>
            </div>
            <div className="modal-body">
                <p>{message}</p>
            </div>
        </Modal>
    );
};

DialogModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default DialogModal;
