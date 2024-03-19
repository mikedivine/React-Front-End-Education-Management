import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CourseEnrollAdd = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [section, setSection] = useState({secNo:'', CourseID:'', Year:'', Semester:'', Building:'',Room:'',Times:''});

    /*
     *  dialog for edit course
     */
    const editOpen = (event) => {
        setOpen(true);
        setEditMessage('');
        setSection(props.section);
    };

    const editClose = () => {
        setOpen(false);
        setSection({secNo:'', CourseID:'', Year:'', Semester:'', Building:'',Room:'',Times:''});

    };
    const onSave = () => {
        props.save(section);
        editClose();
    }

    return (
        <>
            <Button onClick={editOpen}>Enroll</Button>
            <Dialog open={open}>
                <DialogTitle>Are you sure you want to Enroll for this Course </DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <h4>{editMessage}</h4>
                    <TextField style={{padding:10}} autoFocus fullWidth label="courseId" name="courseId" value={section.courseId}  InputProps={{readOnly: true}}  />
                    <TextField style={{padding:10}} fullWidth label="title" name="title" value={section.year} InputProps={{readOnly: true}}   />
                    <TextField style={{padding:10}} fullWidth label="semester" name="semester" value={section.semester} InputProps={{readOnly: true}}   />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={editClose}>No</Button>
                    <Button color="primary" onClick={onSave}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CourseEnrollAdd;
