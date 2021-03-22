import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from '../../../utils/utils';
import { TABLE_NAME } from '../customer.constants';
import { updateCustomer } from '../customer.services';

export const EditCustomer = ({ index, detail, cancel }) => {
  const [name, setName] = useState(detail.name);
  const [description, setDescription] = useState(detail.description);
  const [priority, setPriority] = useState(detail.priority);
  const [status, setStatus] = useState(detail.status);

  const [isNameFilled, setIsNameFilled] = useState(true);
  const [isDescriptionFilled, setDescriptionFilled] = useState(true);
  const [isPriorityFilled, setPriorityFilled] = useState(true);
  const [isStatusFilled, setStatusFilled] = useState(true);

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleChangePriority = e => {
    setPriority(e.target.value);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const data = getData(TABLE_NAME);
    const listData = data.filter(
      element => element.name !== detail.name && element.description !== detail.description,
    );
    if (name === '') { setIsNameFilled(false); }
    else setIsNameFilled(true);
    if (description === '') setDescriptionFilled(false);
    else setDescriptionFilled(true);
    if (priority === 'Choose..') setPriorityFilled(false);
    else setPriorityFilled(true);
    if (status === 'Choose..') setStatusFilled(false);
    else setStatusFilled(true);
    if (name !== '' && description !== '' && priority !== 'Choose..' && status !== 'Choose..') {
      const customer = {
        name,
        description,
        priority,
        status,
        id: detail.id,
      };
      if (
        listData.filter(
          element =>
            element.name === customer.name && element.description === customer.description,
        ).length === 0
      ) {
        dispatch(updateCustomer(index, customer, TABLE_NAME));
        cancel(true);
      }
      else alert('Type project already exist!!!');
    }
  };
  return (
    <div>
      <div className='header'>CREATE</div>
      <div className='containerDetail'>
        <div className='groupData'>
          <label className='leading-loose'>Name :</label>
          <input
            type='text'
            className='inputDetail'
            name='name'
            value={name}
            onChange={handleChangeName}
            autoFocus
          />
        </div>
        {!isNameFilled
          ? <div className='text-red-600'>Please fill in name</div> : null}
        <div className='groupData'>
          <label className='leading-loose'>Description :</label>
          <textarea
            type='text'
            className='inputDetail'
            name='description'
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
        {!isDescriptionFilled
          ? <div className='text-red-600'>Please fill in description</div> : null}
        <div className='groupData'>
          <label>Priority:</label>
          <select
            className='select'
            name='priority'
            value={priority}
            onChange={handleChangePriority}
          >
            <option value='Choose..'>Choose..</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
          {!isPriorityFilled
            ? <div className='text-red-600'>Please choose priority number</div> : null}
          <label>Status:</label>
          <select className='select' name='status' value={status} onChange={handleChangeStatus}>
            <option value='Choose..'>Choose..</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          {!isStatusFilled
            ? <div className='text-red-600'>Please choose status</div> : null}
        </div>
        <div>
          <div className='groupBtn'>
            <button className='btnCancel' onClick={() => cancel(true)}>
              <i className='fas fa-times px-3'></i>CANCEL
            </button>
            <button className='btnConfirm' onClick={handleSubmit}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
