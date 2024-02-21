import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UserUpdate = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [user, setUser] = useState({id:'', name:'', email:'', type:''});

    /*
     *  dialog for edit user
     */
    const editOpen = (event) => {
        setOpen(true);
        setEditMessage('');
        setUser(props.user);
    };

    const editClose = () => {
        setOpen(false);
        setUser({id:'', name:'', email:'', type:''});
    };

    const editChange = (event) => {
        setUser({...user,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(user.type)) {
            setEditMessage('type must be STUDENT, INSTRUCTOR or ADMIN')
        } else {
            props.save(user);
            editClose();
        }
    }


    return (
        <div>
        <Button onClick={editOpen}>Edit</Button>
        <Dialog open={open} >
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <h4>{editMessage}</h4>
                <TextField style={{padding:10}} fullWidth label="id" name="id" value={user.id} InputProps={{readOnly: true, }}/>
                <TextField style={{padding:10}} autoFocus fullWidth label="name" name="name" value={user.name} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="email" name="email" value={user.email} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="type" name="type" value={user.type} onChange={editChange}  /> 
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={editClose}>Close</Button>
                <Button color="primary" onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog> 
        </div>                       
    )
}

export default UserUpdate;