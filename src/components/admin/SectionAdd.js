import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {REGISTRAR} from '../../Constants';

/*
 * Dialog for edit a section
 */

const SectionAdd = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [section, setSection] = useState(
        {secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''}
     );

    const editOpen = () => {
        setSection( {secNo:'', courseId:'', secId:'', year:'', semester:'', building:'', room:'', times:'',
        instructorName:'', instructorEmail:''});
        setEditMessage('');
        setOpen(true);
    };

    const editClose = () => {
        setOpen(false);
        props.onClose();
    };

    const editChange = (event) => {
        setSection({...section,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        if (section.courseId==='' || section.secId==='' || section.year==='' || section.semester==='') {
            setEditMessage('Must enter data for courseId secId, year semester');
        } else {
            addSection(section);
        }
    }

    const addSection = async (section) => {
        try {
          const response = await fetch (`${REGISTRAR}/sections`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify(section),
            });
          if (response.ok) {
            const rc = await response.json();
            setEditMessage("section added secno="+rc.secNo);
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
        <Button id="addSection" onClick={editOpen}>Add Section</Button>
        <Dialog open={open} >
            <DialogTitle>Add Section</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <h4 id="addMessage">{editMessage}</h4>
                <TextField id="ecourseId" style={{padding:10}} autoFocus fullWidth label="courseId" name="courseId" value={section.courseId} onChange={editChange}  /> 
                <TextField id="esecId" style={{padding:10}} fullWidth label="secId" name="secId" value={section.secId} onChange={editChange}  /> 
                <TextField id="eyear" style={{padding:10}} fullWidth label="year" name="year" value={section.year} onChange={editChange}  /> 
                <TextField id="esemester" style={{padding:10}} fullWidth label="semester" name="semester" value={section.semester} onChange={editChange}  /> 
                <TextField id="ebuilding" style={{padding:10}} fullWidth label="building" name="building" value={section.building} onChange={editChange}  /> 
                <TextField id="eroom" style={{padding:10}} fullWidth label="room" name="room" value={section.room} onChange={editChange}  /> 
                <TextField id="etimes" style={{padding:10}} fullWidth label="times" name="times" value={section.times} onChange={editChange}  /> 
                <TextField id="einstructorEmail" style={{padding:10}} fullWidth label="instructorEmail" name="instructorEmail" value={section.instructorEmail} onChange={editChange}  /> 
            </DialogContent>
            <DialogActions>
                <Button id="close" color="secondary" onClick={editClose}>Close</Button>
                <Button id="save" color="primary" onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog> 
        </div>                       
    )
}

export default SectionAdd;