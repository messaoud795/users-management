import React, { useState } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import validator from 'validator';
import { addUsers } from '../actions/user_actions';
import './ModalAddUser.css';

export default function ModalAddUser() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    email: '',
  });
  const { error, loadingAction } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //clear input after closing modal
  const init = () => {
    setDetails({
      name: '',
      email: '',
    });
    setOpen(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { name, email } = details;
    //validate data before sending the request using validator package
    const dataValidated =
      validator.isLength(name, { min: 5 }) && validator.isEmail(email);
    //error popup if one of the condition are not fulfilled
    //if no error launch an add request
    if (!dataValidated) toastr.error('Error', 'Please enter a valid data');
    else await dispatch(addUsers(details));
    if (!loadingAction && !error) {
      init();
    }
  };
  return (
    <Modal
      className="modalAddAction"
      onClose={init}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="iconAdd">
          <Icon name="add circle" />
          <span className="tooltiptext">Add a user</span>
        </div>
      }
    >
      <Modal.Header content="Enter action details" className="modalHeader" />
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
            <label>email</label>
            <input
              required={true}
              name="email"
              placeholder="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.description}
              autoComplete="off"
            />
          </Form.Field>

          <Button
            content="Cancel"
            onClick={init}
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
