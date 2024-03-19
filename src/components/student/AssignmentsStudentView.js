import React, {useEffect, useState} from 'react';
import CourseUpdate from "../admin/CourseUpdate";
import Button from "@mui/material/Button";
import CourseAdd from "../admin/CourseAdd";
import {SERVER_URL} from "../../Constants";

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

const AssignmentsStudentView = (props) => {
    const headers = ['Course ID', 'Course Title', 'Assignment Title', 'Assignment DueDate', 'Score'];
    const[assignments, setAssignments] = useState([ ]);
    const [ message, setMessage ] = useState('');

    const  fetchAssignments = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments?studentId=3&year=2024&semester=Spring`);
            if (response.ok) {
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
        });
     
    return (
        <div>
            <h3>Assignments</h3>
            <h4>{message}</h4>
            <table className="Center">
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {assignments.map((a) => (
                    <tr key={a.id}>
                        <td>{a.courseId}</td>
                        <td>{a.courseTitle}</td>
                        <td>{a.title}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignmentsStudentView;