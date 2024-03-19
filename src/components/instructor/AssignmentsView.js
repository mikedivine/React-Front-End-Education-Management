import {SERVER_URL} from '../../Constants';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AssignmentUpdate from './AssignmentUpdate';
import AssignmentAdd from './AssignmentAdd';
import Button from '@mui/material/Button';

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = (props) => {

    const headers = ['Assignment ID', 'Course Title', 'Assignment Title','Due Date', 'Course ID', 'Section ID', 'Section No.']
    
    const location = useLocation();
    const {secNo} = location.state;

    const [ assignments, setAssignments ] = useState([]);
    const [ message, setMessage ] = useState('');

    const fetchAssignments = async () => {
        try{
            const response = await fetch(`${SERVER_URL}/sections/${secNo}/assignments?instructorEmail=dwisneski@csumb.edu`);
            if (response.ok){
                const assignments = await response.json();
                setAssignments(assignments);
            } else {
                const json = await response.json();
                setMessage("response error: " + json.message);
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    useEffect(() => {
        fetchAssignments();
    }, [secNo])

    const saveAssignment = async (assignment) => {
        try {
          const response = await fetch (`${SERVER_URL}/assignments?instructorEmail=dwisneski@csumb.edu`, 
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(assignment),
              });
          if (response.ok) {
            setMessage("Assignment saved")
            fetchAssignments();
          } else {
            const json = await response.json();
            setMessage("response error: " + json.message);
          }
        } catch (err) {
          setMessage("network error: " + err);
        }
      }
  
      const addAssignment = async (assignment) => {
        try {
          const response = await fetch (`${SERVER_URL}/assignments?instructorEmail=dwisneski@csumb.edu`, 
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(assignment),
              });
          if (response.ok) {
            setMessage("Assignment added")
            fetchAssignments();
          } else {
            const rc = await response.json();
            setMessage(rc.message);
          }
        } catch (err) {
          setMessage("network error: " + err);
        }
      }
  
      const deleteAssignment = async (assignmentId) => {
        try {
          const response = await fetch (`${SERVER_URL}/assignments/${assignmentId}?instructorEmail=dwisneski@csumb.edu`, 
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }, 
              });
          if (response.ok) {
            setMessage("Assignment deleted");
            fetchAssignments();
          } else {
            const rc = await response.json();
            setMessage("Delete failed " + rc.message);
          }
        } catch (err) {
          setMessage("network error: " + err);
        }
      }
      
      const onDelete = (e) => {
        const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
        const assignmentId = assignments[row_idx].id;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Do you really want to delete this assignment? ' +
              ' All grades related to this assignment will be deleted as well.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteAssignment(assignmentId)
              },
              {
                label: 'No',
              }
            ]
          });
      }

    return(
        <div> 
            <h3>Assignments</h3>
            <h4>{message}</h4>
            <table className="Center">
                <thead>
                <tr>
                    {headers.map((h, idx) => (<th key={idx}>{h}</th>))}
                </tr>
                </thead>
                <tbody>
                {assignments.map((a) => (
                    <tr key = {a.id}>
                        <td>{a.id}</td>
                        <td>{a.courseTitle}</td>
                        <td>{a.title}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.courseId}</td>
                        <td>{a.secId}</td>
                        <td>{a.secNo}</td>
                        <td><Link to="/assignmentGrades" state={{assignmentId:a.id, assignmentTitle:a.title}}>Grade</Link></td>
                        <td><AssignmentUpdate assignment={a} save={saveAssignment} /></td>
                        <td><Button onClick={onDelete}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>

            </table>
            <AssignmentAdd save={addAssignment} theAssignment={assignments[0]} />
        </div>
    );
}

export default AssignmentsView;
