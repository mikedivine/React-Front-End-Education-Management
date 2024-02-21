import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AdminUserUpdate from './UserUpdate';
import AdminUserAdd from './UserAdd';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../../Constants';

function UsersView(props) {
    const headers = ['ID', 'Name', 'Email', 'Type', '', ''];
    
    const [users, setUsers] = useState([  ]);

    const [message, setMessage] = useState('');

    const  fetchUsers = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/users`);
        if (response.ok) {
          const users = await response.json();
          setUsers(users);
        } else {
          const json = await response.json();
          setMessage("response error: "+json.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }  
    }

    useEffect( () => {
      fetchUsers();
    }, []);

    const saveUser = async (user) => {
      try {
        const response = await fetch(`${SERVER_URL}/users`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(user),
          });
        if (response.ok) {
          setMessage("user saved")
          fetchUsers();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }   
    }

    const addUser = async (user) => {
      try {
        const response = await  fetch(`${SERVER_URL}/users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(user),
          });
        if (response.ok) {
          const newuser = await response.json();
          setMessage("user added id="+newuser.id);
          fetchUsers();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const deleteUser = async (id) => {
      try {
        const response = await fetch(`${SERVER_URL}/users/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }, 
          });
        if (response.ok) {
          setMessage("User deleted");
          fetchUsers();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        } 
      } catch (err) {
        setMessage("network error: "+err);
      }
    }


    const onDelete = (e) => {
      const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
      const id = users[row_idx].id;
      confirmAlert({
          title: 'Confirm to delete',
          message: 'Do you really want to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteUser(id)
            },
            {
              label: 'No',
            }
          ]
        });
    }

    return(
        <> 
            <h3>Users</h3>   
            <h4>{message}</h4>     
            <table className="Center" > 
                <thead>
                  <tr>
                      {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                          <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.type}</td>
                          <td><AdminUserUpdate user={user} save={saveUser} /></td>
                          <td><Button onClick={onDelete}>Delete</Button></td>
                          </tr>
                      ))}
                </tbody>
            </table>
            <AdminUserAdd save={addUser} />
        </>
    );
}
export default UsersView;
