import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div
  className={styles.backdrop} onClick={props.onClick} ></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div>{props.children}</div>
    </div>
  );
}; 

const Modal = (props) => {
  const portalElement = document.getElementById("overlay");
  return (
    <>
      {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
