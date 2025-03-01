import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addUser, deleteUser } from '../store/actions';
import { selectUsers } from '../store/selectors';
import { capitalize } from '../utils';

const Dashboard: React.FC = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  function newUser() {
    // eslint-disable-next-line no-alert
    const name = prompt('Enter user name');

    if (!name) return;

    dispatch(addUser(name.toLowerCase()));
  }

  function removeUser(name: string) {
    dispatch(deleteUser(name));
  }

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user}>
            <Link to={`/chat/${user}`}>{capitalize(user)}</Link>
            <button style={{ marginLeft: '10px' }} onClick={() => removeUser(user)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={newUser}>Create New User</button>
    </div>
  );
};

export default Dashboard;
