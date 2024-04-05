import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {GRADEBOOK} from '../../Constants';
import Button from "@mui/material/Button";

// instructor view list of students enrolled in a section 
// use location to get section no passed from InstructorSectionsView
// fetch the enrollments using URL /sections/{secNo}/enrollments
// display table with columns
//   'enrollment id', 'student id', 'name', 'email', 'grade'
//  grade column is an input field
//  hint:  <input type="text" name="grade" value={e.grade} onChange={onGradeChange} />

const EnrollmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseTitle} = location.state;

    const headers = ['Enrollment ID', 'Student ID', 'Name', 'Email', 'Grade']

    const [ message, setMessage] = useState('');

    const [ enrollments, setEnrollments] = useState([]);

    const fetchEnrollments = async () => {
        try{
            const response = await fetch(`${GRADEBOOK}/sections/${secNo}/enrollments?instructorEmail=dwisneski@csumb.edu`);
            if (response.ok) {
                const enrollments = await response.json();
                setEnrollments(enrollments);
                (enrollments[0] == undefined) ? setMessage("There are no enrollments in this Course") : setMessage("");
            } else {
                const json = await response.json();
                setMessage('response error: ' + json.message);
            }
        } catch (err) {
            setMessage('network error: ' + err);
        }
    }

    useEffect(() => {
        fetchEnrollments();
    }, [secNo]);

    const onGradeChange = (enrollmentId, newGrade) => {
        const updateEnrollment = enrollments.map((enrollment) => {
            if (enrollment.enrollmentId === enrollmentId) {
                return {...enrollment, grade: newGrade};
            }
            return enrollment;
        });
        setEnrollments(updateEnrollment);
    }


    const saveEnrollments = async () => {
        try {
            console.log(JSON.stringify(enrollments));
            const response = await fetch(`${GRADEBOOK}/enrollments?instructorEmail=dwisneski@csumb.edu`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(enrollments),
                });
            if (response.ok) {
                setMessage('Enrollment Saved');
            } else {
                const json = await response.json();
                setMessage('response error: '+json.message);
            }
        } catch (err)  {
            setMessage("network error: "+err);
        }
    }

    return(
        <> 
            <h3>Enrollments for {courseTitle}</h3>
            <h4>{message}</h4>
            <table className="Center">
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {enrollments.map((enrollment) => (
                    <tr key = {enrollment.enrollmentId}>
                        <td>{enrollment.enrollmentId}</td>
                        <td>{enrollment.studentId}</td>
                        <td>{enrollment.name}</td>
                        <td>{enrollment.email}</td>
                        <td>
                            <input type="text"
                                   name="grade"
                                   value={enrollment.grade}
                                   onChange={(e) => onGradeChange(enrollment.enrollmentId, e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Button onClick={saveEnrollments}>Save Enrollments</Button>
        </>
    );
}

export default EnrollmentsView;
