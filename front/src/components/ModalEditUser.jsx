import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import './ModalAddUser.css';
import { toastr } from 'react-redux-toastr';
import validator from 'validator';
import { editUser } from '../actions/user_actions';

export default function ModalEditUser({
  openModalEdit,
  handleModalEdit,
  data,
}) {
  const { error, loadingAction } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    id: data.id,
    name: data.name,
    email: data.email,
  });
  const submitForm = async (e) => {
    // eslint-disable-next-line
    const { id, name, email } = details;
    e.preventDefault();
    //validate data before sending the request using validator package
    const dataValidated =
      validator.isLength(name, { min: 5 }) && validator.isEmail(email);
    //error popup if one of the condition are not fulfilled
    //if no error launch an edit request
    if (!dataValidated) toastr.error('Error', 'Please enter a valid data');
    await dispatch(editUser(details));
    if (!loadingAction && !error) {
      handleModalEdit();
    }
  };
  return (
    <Modal
      onClose={handleModalEdit}
      onOpen={handleModalEdit}
      open={openModalEdit}
    >
      <Modal.Header content="Edit action details" />
      <Modal.Content>
        <Form onSubmit={submitForm} className="modalForm">
          <Form.Field>
            <label>Name</label>
            <input
              required={true}
              name="name"
              placeholder="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              required={true}
              name="email"
              placeholder="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
              autoComplete="off"
            />
          </Form.Field>

          <Button
            content="Cancel"
            onClick={handleModalEdit}
            secondary
            className="modalButton"
          />
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            loading={loadingAction}
            positive
            className="modalButton"
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
