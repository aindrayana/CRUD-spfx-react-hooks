import React, { useRef, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom'

import './modal.scss';

const Context = React.createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [modalContext, setModalContext] = useState();

  useEffect(() => {
    setModalContext(modalRef.current);
  }, []);

  return (
    <>
      <Context.Provider value={modalContext}>{children}</Context.Provider>
      <div id="modal-root" ref={modalRef} />
    </>
  )
}

export const Modal = ({ onShow, onClose, header, children }) => {
  const modalNode = useContext(Context);

  return modalNode ? createPortal (
    <>
      <div onClick={onClose}
        className={`modal-overlay ${onShow ? 'open':''}`}>
      </div>
      <div className={`modal-wrapper ${onShow? 'open' : ''}`}>
        <div className="modal-header">
          { header && <p>{ header }</p> }
          <span onClick={onClose} className="close-modal-btn"></span>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            { children }
          </div>
        </div>
      </div>
    </>,
    modalNode
  ) : null;
};