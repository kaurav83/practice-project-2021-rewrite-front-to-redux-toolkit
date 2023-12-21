import React, { useEffect, useRef, useState } from "react";

import { createContainer } from '../../utils/createContainer';

import Portal from "../Portal/Portal";
import styles from './Modal.module.sass'

const Modal = ({ onClose, children }) => {

  const [isMounted, setMounted] = useState(false);

  const rootRef = useRef(null);

  useEffect(() => {
    createContainer({ id: "modal-container-id" });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return isMounted ? (
    <Portal id="modal-container-id">
      <div className={styles.modal}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper} ref={rootRef}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

export default Modal;