import React, { useState } from 'react';

import { Modal } from '../modal/Modal';
import { AddUpdateList } from './AddUpdateList';

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModalHandler = () => setShowModal(false);

  return (
    <>
      <div className="card-header">
        <div className="card-header__title">Business Case and Roadmap SP List</div>
        <div className="card-header__action">
          <a onClick={() => setShowModal(true)} className="action-btn">add new list</a>
        </div>
        { showModal &&
          <Modal
            onShow={showModal}
            onClose={closeModalHandler}
            header={"Add New List"}
          >
            <AddUpdateList onClose={closeModalHandler} />
          </Modal>
        }
      </div>
    </>
  )
};
