import React, {useState} from 'react';
import {GRADEBOOK} from "../../Constants";

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

const AssignmentsStudentView = (props) => {
    const headers = ['Course ID', 'Course Title', 'Assignment Title', 'Assignment DueDate', 'Score'];
    const [ assignments, setAssignments ] = useState([ ]);
    const [ message, setMessage ] = useState('');
    const [ search, setSearch ] = useState({year: '', semester:''});

    const  fetchAssignments = async () => {
        try {
            const response = await fetch(`${GRADEBOOK}/assignments?studentId=3&year=${search.year}&semester=${search.semester}`);
            if (response.ok) {
                const assignments = await response.json();
                setAssignments(assignments);
                setMessage("");
            } else {
                const json = await response.json();
                setMessage("response error: " + json.message);
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    const editChange = (event) => {
        setSearch({...search, [event.target.name]:event.target.value});
    }

    return (
        <div>
            <h3>Assignments</h3>
            <h4>Enter year & semester.</h4>
            <table className="Center">
                <tbody>
                <tr>
                    <td>Year:</td>
                    <td><input type="text" id="year" name="year" value={search.year} onChange={editChange} /></td>
                </tr>
                <tr>
                    <td>Semester:</td>
                    <td><input type="text" id="semester" name="semester" value={search.semester} onChange={editChange} /></td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button type="submit" id="search" onClick={fetchAssignments}>Search for Schedule</button>
            <br/>
            <h4>{message}</h4>
            <br/>
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