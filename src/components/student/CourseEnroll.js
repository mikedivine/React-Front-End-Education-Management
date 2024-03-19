import React, {useState, useEffect} from 'react';
import {SERVER_URL} from "../../Constants";
import CourseEnrollAdd from "./CourseEnrollAdd";
import SectionUpdate from "../admin/SectionUpdate";
import Button from "@mui/material/Button";

// students displays a list of open sections for a
// use the URL /sections/open
// the REST api returns a list of SectionDTO objects

// the student can select a section and enroll
// issue a POST with the URL /enrollments?secNo= &studentId=3
// studentId=3 will be removed in assignment 7.

const CourseEnroll = (props) => {

    const headers = ['SecNo', 'CourseId', 'SecId',  'Year', 'Semester', 'Building', 'Room', 'Times', '', ''];
    const[sections, setSections] = useState([ ]);
    const [ message, setMessage ] = useState('');

    const  fetchSections = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/sections/open`);
            if (response.ok) {
                const sections = await response.json();
                setSections(sections);
            } else {
                const json = await response.json();
                setMessage("response error: " + json.message);
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    useEffect(() => {
            fetchSections();
        },
        []);
    const addEnrollment = async (section) => {
        try {
            const response = await fetch (`${SERVER_URL}/enrollments?secNo=${section}&studentId=3`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(section),
                });
            if (response.ok) {
                setMessage("Section Enrolled")
                fetchSections();
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    return(
        <div>
            <h3>Student Enrollment</h3>
            <h4>{message}</h4>
            <table className="Center">
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {sections.map((sec) => (
                    <tr key={sec.secNo}>
                        <td>{sec.secNo}</td>
                        <td>{sec.courseId}</td>
                        <td>{sec.secId}</td>
                        <td>{sec.year}</td>
                        <td>{sec.semester}</td>
                        <td>{sec.building}</td>
                        <td>{sec.room}</td>
                        <td>{sec.times}</td>
                        <CourseEnrollAdd save={addEnrollment} section={sec} onClose={fetchSections} />
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseEnroll;