import React from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TABLE_NAME, TECH_STACK, PROJECT } from 'src/modules/staff/staff.constants';
import { useDispatch } from 'react-redux';
import { delAStaff } from 'src/modules/staff/staff.services';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData, getIndex } from 'src/utils/utils';
import { handleOutsideClick } from 'src/services/handleOutsideClick';

export const StaffDetail = () => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const data = getData(TABLE_NAME);
    setDetail(data.filter(element => element.id === id)[0]);
  }, []);
  const deleteStaff = (index, TABLE_NAME) => {
    dispatch(delAStaff(index, TABLE_NAME));
    history.push('/staff/page/1');
  };
  const handleDetail = (element, TABLE) => {
    const index = getIndex(element, TABLE);
    switch (TABLE) {
      case TECH_STACK:
        history.push(`/tech-stack/detail/${index}`);
        break;
      case PROJECT:
        history.push(`/project/detail/${index}`);
        break;
    }
  };
  const ref = useRef();
  handleOutsideClick(ref, () => { if (toggleDelete) setToggleDelete(false); });
  return (
    <div className='relative'>
      {toggleDelete ? <div
        className='modalConfirm'
        ref={ref}
      >
        <div className='text-center pt-4 text-4xl'>Are you sure?</div>
        <div className='text-center px-16 py-4'>
          If you proceed, you will lose your data. Are you sure you want to delete it? </div>
        <div className='groupBtn'>
          <button className='btnNo' onClick={() => setToggleDelete(false)}>
            NO
          </button>
          <button className='btnYes' onClick={() => deleteStaff(id, TABLE_NAME)}>
            YES
          </button>
        </div>
      </div> : null}
      <div className='header'>DETAIL</div>
      <div className='my-3 mx-10'>
        <button onClick={() => history.push('/staff/page/1')} className='btn'>
          Back
        </button>
      </div>
      <div className='containerDetail'>
        <div className='groupData'>
          <label className='leading-loose'>Name :</label>
          <input type='text' className='inputDetail' value={detail.name} readOnly />
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Date of Birth :</label>
          <input type='text' className='inputDetail' value={detail.date} readOnly />
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Identification Number :</label>
          <input type='text' className='inputDetail' value={detail.identificationNumber} readOnly />
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Phone Number :</label>
          <input type='text' className='inputDetail' value={detail.phoneNumber} readOnly />
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Address :</label>
          <input type='text' className='inputDetail' value={detail.address} readOnly />
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Tech Stack :</label>
          <div type='text' className='inputDetail'>
            <ul>
              {detail.techStacks !== undefined
                ? detail.techStacks.map((element, index) => (
                  <li key={index} onClick={() => handleDetail(element, TECH_STACK)}
                    className='cursor-pointer'>
                    <i className='fas fa-atlas pr-2'></i>
                    {element}
                  </li>
                ))
                : null}
            </ul>
          </div>
        </div>
        <div className='groupData'>
          <label className='leading-loose'>Project :</label>
          <div type='text' className='inputDetail'>
            <ul>
              {detail.projects !== undefined
                ? detail.projects.map((element, index) => (
                  <li key={index} onClick={() => handleDetail(element, PROJECT)}
                    className='cursor-pointer'>
                    <i className='fas fa-tasks pr-2'></i>
                    {element}
                  </li>
                ))
                : null}
            </ul>
          </div>
        </div>
        <div>
          <div className='groupBtn'>
            <button className='btnCancel' onClick={() => setToggleDelete(true)}>
              <i className='fas fa-times px-3'></i>DELETE
            </button>
            <button className='btnConfirm' onClick={() => history.push(`/staff/edit/${id}`)}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
