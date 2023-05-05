//import "./Modal.css";
import styled from "styled-components";
import React, { useState } from "react";

interface IModalProps {
    onClose: () => void;
    message: string;
}

const ModalBackgroundBox = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    color: black;
    border: 2px solid blue;
`;
/*
const TextInformation = styled.p`
    color: ;
`;
*/

function Modal(props: IModalProps) {
    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation();
    }

    return (
        <ModalBackgroundBox
            className="modal-background"
            onClick={props.onClose}
        >
            <ModalContent
                className="modal-content"
                onClick={(event) => stopPropagation(event)}
            >
                <p>{props.message}</p>
            </ModalContent>
        </ModalBackgroundBox>
    );
}

//hook customized
export default function useModal(): [
    () => JSX.Element,
    (errorMessage: string) => void
] {
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: "",
    });

    function openModal(errorMessage: string = modalState.message) {
        setModalState({ isOpen: !modalState.isOpen, message: errorMessage });
    }

    //component
    function EasyModal() {
        return (
            <>
                {modalState.isOpen && (
                    <Modal
                        onClose={() => openModal(modalState.message)}
                        message={modalState.message}
                    />
                )}
            </>
        );
    }

    return [EasyModal, openModal];
}
//sexport default useModal;
