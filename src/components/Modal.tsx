import React, { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import '@styles/components/Modal.scss';

const Modal: React.FunctionComponent<ModalProps> = (
  props
): ReactPortal | null =>
  props.isOpen
    ? createPortal(
        <div
          className={`modal fade ${
            props.currentView ? props.currentView : ''
          }`}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3>{props.title ? props.title : '&nbsp;'}</h3>
                <button
                  type='button'
                  className='btn-close'
                  onClick={props.onClose}></button>
              </div>
              <div className='modal-body'>{props.children}</div>
            </div>
          </div>
        </div>,
        document.getElementById('root-modal') as HTMLElement
      )
    : null;

export default Modal;
