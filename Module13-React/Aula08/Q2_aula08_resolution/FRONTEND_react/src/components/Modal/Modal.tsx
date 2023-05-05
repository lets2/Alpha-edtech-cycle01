//import "./Modal.css";
import styled from "styled-components";

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

export default function Modal(props: IModalProps) {
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
