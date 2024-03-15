import {SERVER_URL} from '../../Constants';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = (props) => {

    const headers = ['Assignment ID', 'Assignment Title','Due Date', 'Course ID', 'Section ID', 'Section No.']
    
    const location = useLocation();
    const {secNo, courseId, secId} = location.state;

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
                setMessage("response error: " + json.message)
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    useEffect(() => {
        fetchAssignments();
    }, [secNo])

    return(
        <> 
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
                        <td>{a.title}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.courseId}</td>
                        <td>{a.secId}</td>
                        <td>{a.secNo}</td>
                        <td>
                            <Link to="/editAssignments" state={assignments}>Edit</Link>
                        </td>
                        <td>
                            <Link to="/gradeAssignments" state={assignments}>Grade</Link>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>

        </>
    );
}

export default AssignmentsView;
