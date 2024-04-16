import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../Constants';
import {Link, useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// student can view schedule of sections 
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course 
// issue a DELETE with URL /enrollment/{enrollmentId}

const ScheduleView = (props) => {
    
    const headers = ['Section #', 'Course Title', 'Course Id', 'Section Id',  'Year', 'Semester', 'Building', 'Room', 'Times'];
    const [scheduleClasses, setScheduleClasses]  = useState([   ]);
    const [ message, setMessage] = useState('');
    const [search, setSearch] = useState({studentId: '', year: '', semester:''});
    const jwt = sessionStorage.getItem('jwt');

    const fetchSchedule = async() => {
        if (search.courseId==='' || search.year==='' || search.semester==='' ) {
            setMessage("Enter search parameters");
        } else {
            try {
                const response = await fetch(`${SERVER_URL}/enrollments?year=${search.year}&semester=${search.semester}&studentId=${search.studentId}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': jwt,
                  }
                });

                if (response.ok) {
                    const data = await response.json();
                    setScheduleClasses(data);
                } else {
                    const rc = await response.json();
                    setMessage(rc.message);
                }
            } catch (err) {
                setMessage("network error: " + err);
            }
        }
    }

    useEffect( () => {
        fetchSchedule();
    }, []);

    const editChange = (event) => {
        setSearch({...search, [event.target.name]:event.target.value});
    }

    const dropCourse = async (enrollmentId) => {
        try {
          const response = await fetch (`${SERVER_URL}/enrollments/${enrollmentId}?studentId=3`, 
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': jwt,
                }, 
              });
          if (response.ok) {
            setMessage("Course Dropped");
            fetchSchedule();
          } else {
            const rc = await response.json();
            setMessage("Drop failed " + rc.message);
          }
        } catch (err) {
          setMessage("network error: " + err);
        }
    }

    const onDrop = (e) => {
        const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
        const enrollmentId = scheduleClasses[row_idx].enrollmentId;
        const courseTitle = scheduleClasses[row_idx].courseTitle;
        confirmAlert({
            title: 'Confirm to Drop Course',
            message: 'Do you really want to drop ' + courseTitle + 
                '.  All graded assignments will be deleted.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => dropCourse(enrollmentId)
              },
              {
                label: 'No',
              }
            ]
        });
    }
   
    return(
        < > 
            <h3>Schedule View</h3>
            <h4>{message}</h4>
            <h4>Enter studentId, year, semester.</h4>
            <table className="Center">
                <tbody>
                <tr>
                    <td>Student Id:</td>
                    <td><input type="text" id="studentId" name="studentId" value={search.studentId} onChange={editChange} /></td>
                </tr>
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
            <button type="submit" id="search" onClick={fetchSchedule}>Search for Schedule</button>
            <br/>
            <br/>
            <table className="Center" > 
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {scheduleClasses.map((s) => (
                        <tr key={s.enrollmentId}>
                            <td>{s.sectionNo}</td>
                            <td>{s.courseTitle}</td>
                            <td>{s.courseId}</td>
                            <td>{s.sectionId}</td>
                            <td>{s.year}</td>
                            <td>{s.semester}</td>
                            <td>{s.building}</td>
                            <td>{s.room}</td>
                            <td>{s.times}</td>
                            <td>
                                <Button onClick={onDrop}>Drop Course</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </ >
    );   
}

export default ScheduleView;