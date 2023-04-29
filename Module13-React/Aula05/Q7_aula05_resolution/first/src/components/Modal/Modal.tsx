import "./Modal.css";

interface IModalProps {
    onClose: () => void;
    message: string;
}

export default function Modal(props: IModalProps) {
    function stopPropagation(event: React.MouseEvent) {
        event.stopPropagation();
    }

    return (
        <div className="modal-background" onClick={props.onClose}>
            <div
                className="modal-content"
                onClick={(event) => stopPropagation(event)}
            >
                <p>{props.message}</p>
            </div>
        </div>
    );
}
