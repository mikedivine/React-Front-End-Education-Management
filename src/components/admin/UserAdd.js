import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UserAdd = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [user, setUser] = useState({name:'', email:'', type:''});

    /*
     *  dialog for add user
     */
    const editOpen = () => {
        setOpen(true);
        setEditMessage('');
    };

    const editClose = () => {
        setOpen(false);
        setUser({name:'', email:'', type:''});
        setEditMessage('');
    };

    const editChange = (event) => {
        setUser({...user,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        if (user.name.length===0) {
            setEditMessage("name can not be empty");
        } else if (user.email.length===0) {
            setEditMessage("email cannot be empty");
        } else if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(user.type)) {
            setEditMessage("Type must be STUDENT, INSTRUCTOR or ADMIN");
        } else {
            props.save(user);
            editClose();
        }
    }

    return (
        <>
            <Button onClick={editOpen}>Add User</Button>
            <Dialog open={open} >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <h4>{editMessage}</h4>
                    <TextField style={{padding:10}} autoFocus fullWidth label="name" name="name" value={user.name} onChange={editChange}  /> 
                    <TextField style={{padding:10}} fullWidth label="email" name="email" value={user.email} onChange={editChange}  /> 
                    <TextField style={{padding:10}} fullWidth label="type" name="type" value={user.type} onChange={editChange}  /> 
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={editClose}>Close</Button>
                    <Button color="primary" onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog> 
        </>                       
    )
}

export default UserAdd;