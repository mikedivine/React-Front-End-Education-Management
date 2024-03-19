import {SERVER_URL} from '../../Constants';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />
 

const AssignmentGrade = (props) => {

    const headers = ['Grade ID', 'Student Name','Student Email', 'Score']

    const location = useLocation();
    const {assignmentId,assignmentTitle} = location.state;

    const [ grades, setGrades ] = useState([]);
    const [ grade, setGrade ] = useState({gradeId:'', studntName:'', studentEmail:'', assignmentTitle:'',
                                            courseId:'', sectionId:'', score:''});
    const [ message, setMessage ] = useState('');

    const fetchGrades = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments/${assignmentId}/grades?instructorEmail=dwisneski@csumb.edu`);
            if (response.ok) {
                const grades = await response.json();
                setGrades(grades);
            } else {
                const json = await response.json();
                setMessage("response error: " + json.message)
            }
        } catch (err) {
            setMessage("network error: " + err);
        }
    }

    const saveGrades = async () => {
        try {
          const response = await fetch (`${SERVER_URL}/grades?instructorEmail=dwisneski@csumb.edu`, 
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(grades),
              });
          if (response.ok) {
            setMessage("Grades saved")
          } else {
            const json = await response.json();
            setMessage("response error: " + json.message);
          }
        } catch (err) {
          setMessage("network error: " + err);
        }
    }

    const onScoreChange = (gradeId, score) => {
        // grades[index].score = score;
        const updateGrade = grades.map((grade) => {
            if (grade.gradeId === gradeId) {
                return {...grade, score: score};
            }
            return grade;
        });
        setGrades(updateGrade);
    }

    useEffect(() => {
        fetchGrades();
    }, [assignmentId]);
     
    return(
        <> 
            <h3>Grades for {assignmentTitle}</h3>
            <h4>{message}</h4>
            <table className="Center">
                <thead>
                <tr>
                    {headers.map((h, idx) => (<th key={idx}>{h}</th>))}
                </tr>
                </thead>
                <tbody>
                {grades.map((g, idx) => (
                    <tr key = {g.gradeId}>
                        <td>{g.gradeId}</td>
                        <td>{g.studentName}</td>
                        <td>{g.studentEmail}</td>
                        <td>
                            <input type="text"
                                   name="score"
                                   value={g.score}
                                   onChange={(e) => onScoreChange(g.gradeId, e.target.value)}
                            />
                            {/* <TextField style={{padding:0,width:100}} name="score"
                                value={g.score} onChange={editChange(idx,g.score)} /> */}
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            <Button onClick={saveGrades}>Save Grades</Button>
        </>
    );
}

export default AssignmentGrade;