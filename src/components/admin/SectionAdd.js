import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SectionAdd = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [section, setSection] = useState(
        {secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''}
     );

    /*
     *  dialog for edit user
     */
    const clearData = () => {
        setSection( {secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''});
        setEditMessage('');
    }

    const editOpen = () => {
        clearData();
        setOpen(true);
    };

    const editClose = () => {
        setOpen(false);
        clearData();
    };

    const editChange = (event) => {
        setSection({...section,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        if (section.courseId==='' || section.secId==='' || section.year==='' || section.semester==='') {
            setEditMessage('Must enter data for courseId secId, year semester');
        } else {
            props.save(section);
            editClose();
        }
    }


    return (
        <div>
        <Button onClick={editOpen}>Add Section</Button>
        <Dialog open={open} >
            <DialogTitle>Add Section</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <h4>{editMessage}</h4>
                <TextField style={{padding:10}} autoFocus fullWidth label="courseId" name="courseId" value={section.courseId} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="secId" name="secId" value={section.secId} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="year" name="year" value={section.year} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="semester" name="semester" value={section.semester} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="building" name="building" value={section.building} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="room" name="room" value={section.room} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="times" name="times" value={section.times} onChange={editChange}  /> 
                <TextField style={{padding:10}} fullWidth label="instructorEmail" name="instructorEmail" value={section.instructorEmail} onChange={editChange}  /> 
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={editClose}>Close</Button>
                <Button color="primary" onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog> 
        </div>                       
    )
}

export default SectionAdd;