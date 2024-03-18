import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//  instructor updates assignment title, dueDate 
//  use an mui Dialog
//  issue PUT to URL  /assignments with updated assignment

const AssignmentUpdate = (props)  => {

  const [open, setOpen] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [assignment, setAssignment] = useState({assignmentId:'',title:'', dueDate:'', courseId:'', secId:'', secNo:''});

  /*
   *  dialog for edit assignment
   */
  const editOpen = (event) => {
      setOpen(true);
      setEditMessage('');
      setAssignment(props.assignment);
  };

  const editClose = () => {
      setOpen(false);
      setAssignment({assignmentId:'', title:'', dueDate:'', courseId:'', secId:'', secNo:''});
      
  };

  const editChange = (event) => {
      setAssignment({...assignment,  [event.target.name]:event.target.value})
  }

  const onSave = () => {
      if (assignment.title === '') {
          setEditMessage("Title cannot be blank");

      } else if (assignment.dueDate === '') {
          setEditMessage("Due Date cannot be blank");

      } else {
          props.save(assignment);
          editClose();
      }
  }

  return (
      <>
          <Button onClick={editOpen}>Edit</Button>
          <Dialog open={open} >
              <DialogTitle>Edit Assignment</DialogTitle>
              <DialogContent  style={{paddingTop: 20}} >
                  <h4>{editMessage}</h4>
                  <TextField style={{padding:10}} fullWidth label="ID" name="id"
                    value={assignment.id} readOnly /> 
                  <TextField style={{padding:10}} autoFocus fullWidth label="Title" name="title"
                    value={assignment.title} onChange={editChange} /> 
                  Due Date: <input type="date" style={{padding:15, margin:10}} label="Due Date" name="dueDate"
                        value={assignment.dueDate} onChange={editChange} />
                  <TextField style={{padding:10}} fullWidth label="Course ID" name="courseId"
                    value={assignment.courseId} readOnly />
                  <TextField style={{padding:10}} fullWidth label="Section ID" name="secId"
                    value={assignment.secId} readOnly />
                  <TextField style={{padding:10}} fullWidth label="Section Number" name="secNo"
                    value={assignment.secNo} readOnly />
              </DialogContent>
              <DialogActions>
                  <Button color="secondary" onClick={editClose}>Close</Button>
                  <Button color="primary" onClick={onSave}>Save</Button>
              </DialogActions>
          </Dialog> 
      </>                       
  )
}

export default AssignmentUpdate;
