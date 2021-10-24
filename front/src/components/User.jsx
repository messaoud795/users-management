import React, { useState } from 'react';
import './User.css';
import { Icon } from 'semantic-ui-react';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';

export default function User({ data }) {
  const { name, email } = data;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  //open and close modal to delete action
  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  //open and close modal to edit action
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };
  return (
    <div className="user">
      <div className="user__operations">
        <div onClick={handleModalEdit}>
          <Icon name="edit" className="edit" />
        </div>
        <ModalEditUser
          openModalEdit={openModalEdit}
          handleModalEdit={handleModalEdit}
          data={data}
        />
        {/* icon and modal to delete User */}
        <div onClick={handleModalDelete}>
          <Icon name="delete" className="delete" />
        </div>
        <ModalDeleteUser
          openModalDelete={openModalDelete}
          handleModalDelete={handleModalDelete}
          data={data}
        />
      </div>
      <h2 className="user-name">{name}</h2>
      <p className="user-email">{email} </p>
    </div>
  );
}
