import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { deleteUser } from '../actions/user_actions';

export default function ModalDeleteUser({
  openModalDelete,
  handleModalDelete,
  data,
}) {
  const dispatch = useDispatch();
  const { loadingAction, error } = useSelector((state) => state.user);
  //launch delete action
  const handleDeleteAction = async () => {
    await dispatch(deleteUser(data.id));
    if (!loadingAction && !error) {
      handleModalDelete();
    }
  };
  return (
    <Modal
      className="modal"
      onClose={handleModalDelete}
      onOpen={handleModalDelete}
      open={openModalDelete}
    >
      <Modal.Header className="modalHeader">
        Confirm to delete this user
      </Modal.Header>
      <Modal.Content>
        <h3 className="modalForm">{data.name}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          primary
          onClick={handleModalDelete}
          className="modalButton"
        />
        <Button
          content="OK"
          negative
          onClick={handleDeleteAction}
          className="modalButton"
        />
      </Modal.Actions>
    </Modal>
  );
}
