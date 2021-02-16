import React, { useContext, useEffect, useState } from 'react';
import { sp } from "sp-pnp-js";
import { useForm } from 'react-hook-form';
import SpPeoplePicker from 'react-sp-people-picker'
import 'react-sp-people-picker/dist/index.css'

import { GlobalContext } from '../../context/GlobalState';

export const AddUpdateList = ({onClose, isUpdate, list, id}) => {
  const [data, setData] = useState({});
  const [personName, setPersonName] = useState();
  const { register, handleSubmit, setValue, errors } = useForm();
  const { addListItem, editListItem } = useContext(GlobalContext);

  const onSubmit = formData => {
    const getSubmitData = {...data, ...formData};
    setData(getSubmitData);
    if (!isUpdate) {
      sp.web.lists.getById("8C271450-D3F9-489C-B4FC-9C7470594466").items.add(getSubmitData).then(result => {
        if (result && result.data) {
          addListItem({...result.data, Person_Responsible: personName});
          onClose();
        }
      });
    } else {
      sp.web.lists.getById("8C271450-D3F9-489C-B4FC-9C7470594466").items.getById(id)
        .update(getSubmitData)
        .then(result => {
          if (result && result.data) {
            editListItem({...getSubmitData, Person_Responsible: personName, Id: id})
            onClose();
          }
        })
    }
  }

  const getUserByEmail = (email) => {
    return sp.web.siteUsers.getByEmail(email).get().then(user => {
      setPersonName(user.Title);
      return user.Id;
    })
  };

  const handleGetSeletedUser = (user) => {
    if (user && user.EntityData) {
      getUserByEmail(user.EntityData.Email).then(user => {
        setData({...data, Person_x0020_ResponsibleId: Number(user)});
      })
    }
  };

  const stripHTML = (html) => {
    let temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };

  useEffect(() => {
    if (isUpdate) {
      const fields = [
        "Project_x0020_Name",
        "Status",
        "StatusNote",
        "TeamReview",
        "LeadReview",
        "ManagerReview"];
      fields.forEach(field => setValue(field, stripHTML(list[field])));
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="form-wrapper">
          <li className="form-input">
            <label><b>Project Name:</b> <span class="required">*</span></label>
            <input type="text" name="Project_x0020_Name" ref={register({ required: true })} />
            {errors.Project_x0020_Name && <div>This is required</div>}
          </li>
          <li className="form-input">
            <label><b>Person Responsible:</b> <span class="required">*</span></label>
            <SpPeoplePicker onSelect={handleGetSeletedUser} onEdit={isUpdate? list.Person_Responsible : ''} />
          </li>
          <li className="form-input">
            <label><b>Status:</b> <span class="required">*</span></label>
            <select name="Status" ref={register}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Review">Ready for Review</option>
              <option value="Approved">Approved</option>
            </select>
          </li>
          <li className="form-input">
            <label><b>Status Note:</b></label>
            <textarea name="StatusNote" ref={register} />
          </li>
          <li className="form-input">
            <label><b>Team Review:</b></label>
            <select name="TeamReview" ref={register}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Review">Ready for Review</option>
              <option value="Approved">Approved</option>
            </select>
          </li>
          <li className="form-input">
            <label><b>Lead Review:</b></label>
            <select name="LeadReview" ref={register}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Review">Ready for Review</option>
              <option value="Approved">Approved</option>
            </select>
          </li>
          <li className="form-input">
            <label><b>Manager Review:</b></label>
            <select name="ManagerReview" ref={register}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Review">Ready for Review</option>
              <option value="Approved">Approved</option>
            </select>
          </li>
          <li className="form-submit">
            <button type="submit" value="Save" className="buttons button-primary">Submit</button>
            <a onClick={onClose} className="buttons button-default">Cancel</a>
          </li>
        </ul>
        </form>
    </div>
  )
}
