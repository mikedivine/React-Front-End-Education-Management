import React, {useState, useEffect} from 'react';
import {REGISTRAR} from '../../Constants';

// students gets a list of all courses taken and grades
// use the URL /transcript?studentId=
// the REST api returns a list of EnrollmentDTO objects 
// the table should have columns for 
//  Year, Semester, CourseId, SectionId, Title, Credits, Grade

const Transcript = (props) => {
    
    const headers = ['Year', 'Semester', 'Course ID', 'Course Title', 'Section ID', 'Credits', 'Grade'];
    const [transcript, setTranscript]  = useState([   ]);
    const [ message, setMessage] = useState('');
    const [search, setSearch] = useState({studentId: ''});

    const fetchTranscript = async() => {
        if (search.studentId==='') {
            setMessage("Enter student ID");
        } else {
            try {
                const response = await fetch(`${REGISTRAR}/transcripts?studentId=${search.studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTranscript(data);
                } else {
                    const rc = await response.json();
                    setMessage(rc.message);
                }
            }catch (err) {
                setMessage("network error: " + err);
            }
        }
    }

    useEffect( () => {
        fetchTranscript();
    }, [])
    
    const editChange = (event) => {
        setSearch({...search, [event.target.name]:event.target.value});
    }

    return(
        <> 
            <h3>Transcript View</h3>
            <h4>{message}</h4>
            <table className="Center">
                <tbody>
                <tr>
                    <td>Student Id:</td>
                    <td><input type="text" id="studentId" name="studentId" value={search.studentId} onChange={editChange} /></td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button type="submit" id="search" onClick={fetchTranscript}>Search for Transccript</button>
            <br/>
            <br/>
            <table className="Center" >
            <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {transcript.map((s) => (
                    //  Year, Semester, CourseId, SectionId, Title, Credits, Grade
                        <tr key={s.enrollmentId}>
                        <td>{s.year}</td>
                        <td>{s.semester}</td>
                        <td>{s.courseId}</td>
                        <td>{s.courseTitle}</td>
                        <td>{s.sectionId}</td>
                        <td>{s.credits}</td>
                        <td>{s.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Transcript;