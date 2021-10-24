import React, { useEffect } from 'react';
import './HomePage.css';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import ModalAddUser from '../components/ModalAddUser';
import User from '../components/User';
import { loadUsers } from '../actions/user_actions';

export default function HomePage() {
  const { loadingAction, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //get the list of actions from db after mounting this component
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-date">{format(new Date(), 'EEEE dd MMMM')}</div>
        <div className="home-actions">
          {loadingAction ? (
            <Loader active className="spinner" />
          ) : (
            <div>
              {users?.map((user) => (
                <User key={user.id} data={user} />
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalAddUser />
      <footer>Developed By Nabil Messaoud in 2021 </footer>
    </div>
  );
}
