import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../../Constants';

const SectionUpdate = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [section, setSection] = useState(
        {secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''});

    /*
     *  dialog for edit section
     */
    const editOpen = () => {
        setEditMessage('');
        setSection({secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''});
        setOpen(true);
        setSection(props.section);
    };

    const editClose = () => {
        setOpen(false);
        props.onClose();
    };

    const editChange = (event) => {
        setSection({...section,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        saveSection(section);
    }

    const saveSection = async (section) => {
        try {
          const response = await fetch (`${SERVER_URL}/sections`, 
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify(section),
            });
          if (response.ok) {
            setEditMessage("section saved");
          } else {
            const rc = await response.json();
            setEditMessage(rc.message);
          }
        } catch (err) {
          setEditMessage("network error: "+err);
        }
      }


    return (
        <div>
        <Button onClick={editOpen}>Edit</Button>
        <Dialog open={open} >
            <DialogTitle>Edit Section</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <h4>{editMessage}</h4>
                <TextField style={{padding:10}} fullWidth label="secNo" name="secNo" value={section.secNo}  InputProps={{readOnly: true, }}  /> 
                <TextField style={{padding:10}} fullWidth label="courseId" name="courseId" value={section.courseId} InputProps={{readOnly: true, }}  /> 
                <TextField style={{padding:10}} fullWidth label="year" name="year" value={section.year} InputProps={{readOnly: true, }} /> 
                <TextField style={{padding:10}} fullWidth label="semester" name="semester" value={section.semester} InputProps={{readOnly: true, }}  /> 
                <TextField style={{padding:10}} autoFocus fullWidth label="secId" name="secId" value={section.secId} onChange={editChange} /> 
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

export default SectionUpdate;