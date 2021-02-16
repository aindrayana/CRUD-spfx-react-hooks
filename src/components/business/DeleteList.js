import React, { useContext } from 'react';
import { sp } from "sp-pnp-js";
import { FaTrashAlt } from "react-icons/fa";
import { GlobalContext } from '../../context/GlobalState';

export const DeleteList = ({list, onClose}) => {
  const { deleteListItem } = useContext(GlobalContext);
  const handleDelete = e => {
    e.stopPropagation();
    sp.web.lists.getById("8C271450-D3F9-489C-B4FC-9C7470594466").items.getById(list.Id).delete().then(result => {
      deleteListItem(list.Id);
      onClose();
    });
  }

  return (
    <div className="delete-confirmation">
      <div className="delete-confirmation__icon-wrapper">
        <FaTrashAlt className="delete-confirmation__icon" />
      </div>
      <div className="delete-confirmation__text">
        <span>Are you sure to delete?</span>
      </div>
      <div className="delete-confirmation__subtext">This process cannot be undone</div>
      <div>
        <button className="buttons button-default" onClick={onClose}>Cancel</button>
        <button className="buttons button-red" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
