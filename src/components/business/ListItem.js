import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { Modal } from '../modal/Modal';
import { DeleteList } from './DeleteList';
import { AddUpdateList } from './AddUpdateList';

export const ListItem = ({list}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({header: null, isDelete: false, isEdit: false, param: null});

  const getStatusIndicator = (text) => {
    const cssLabelStyles = [
      {name: 'pending', label: 'Pending'},
      {name: 'in-progress', label: 'In Progress'},
      {name: 'ready-review', label: 'Ready for Review'},
      {name: 'complete', label: 'Completed'},
      {name: 'complete', label: 'Approved'},
      {name: 'na', label: 'Not Applicable'}
    ];
    let statusLabel = cssLabelStyles.find(label => label.label.toString() === text.toString());
    return  (statusLabel ? statusLabel.name : 'na') 
  }

  const closeModalHandler = () => {
    setShowModal(false);
    setModalContent({
      header: '',
      isDelete: false,
      isEdit: false,
      param: null
    });
  }

  const onDelete = (list) => {
    setShowModal(true);
    setModalContent({
      header: '',
      isDelete: true,
      isEdit: false,
      param: list
    });
  }

  const onEdit = (list) => {
    setShowModal(true);
    setModalContent({
      header: 'Edit List',
      isDelete: false,
      isEdit: true,
      param: list
    });
  }

  return (
    <>
      <tr>
        <td>{list.Project_x0020_Name}</td>
        <td>{list.Person_Responsible}</td>
        <td><span className={"status " + getStatusIndicator(list.Status)}>{list.Status}</span></td>
        <td><div dangerouslySetInnerHTML={{ __html: list.StatusNote }} /></td>
        <td><span className={"status " + getStatusIndicator(list.TeamReview)}>{list.TeamReview}</span></td>
        <td><span className={"status " + getStatusIndicator(list.LeadReview)}>{list.LeadReview}</span></td>
        <td><span className={"status " + getStatusIndicator(list.ManagerReview)}>{list.ManagerReview}</span></td>
        <td className="action">
          <FaEdit className="edit-icon" onClick={() => onEdit(list)} />
          &nbsp;&nbsp;
          <FaTrashAlt className="delete-icon" onClick={() => onDelete(list)} />
        </td>
      </tr>
      {showModal && 
        <Modal
          onShow={showModal}
          onClose={closeModalHandler}
          header={modalContent.header}
        >
          {modalContent && modalContent.isDelete && 
            <DeleteList list={modalContent.param} onClose={closeModalHandler} />
          }

          {modalContent && modalContent.isEdit && 
            <AddUpdateList isUpdate={true} id={list.Id} list={modalContent.param} onClose={closeModalHandler} />
          }
        </Modal>
      }
    </>    
  )
}
