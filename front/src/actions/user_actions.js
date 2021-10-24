import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  ACTION_ACTION_ERROR,
  ACTION_ACTION_START,
  ACTION_ADD_SUCCESS,
  ACTION_DELETE_SUCCESS,
  ACTION_EDIT_SUCCESS,
  ACTION_LOAD_SUCCESS,
} from './actionsTypes';
//add an user: reload actions in case of success  or show an error message
export const addUsers = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.post('user/create', data);
      dispatch({ type: ACTION_ADD_SUCCESS });
      toastr.success('Success', ' A new user is created');
      dispatch(loadUsers());
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
      toastr.error('Error', 'action is not created');
    }
  };
};
//load all users from the db
export const loadUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      const { data } = await axios.get('user/');
      dispatch({ type: ACTION_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
    }
  };
};
//edit an action: reload users in case of success  or show an error message
export const editUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.patch(`user/${data.id}`, data);
      dispatch({ type: ACTION_EDIT_SUCCESS });
      toastr.success('Success', 'User is updated');
      dispatch(loadUsers());
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR, payload: error });
      toastr.error('Error', 'User is not updated');
    }
  };
};
//delete an action: reload actions in case of success  or show an error message
export const deleteUser = (UserId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_ACTION_START });
      await axios.delete(`user/${UserId}`);
      dispatch({ type: ACTION_DELETE_SUCCESS });
      toastr.success('Success', 'User data is deleted');
      dispatch(loadUsers());
    } catch (error) {
      dispatch({ type: ACTION_ACTION_ERROR });
      toastr.error('Error', 'User is not deleted');
    }
  };
};
