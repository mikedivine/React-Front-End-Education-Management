import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../Constants';

// student can view schedule of sections 
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course 
// issue a DELETE with URL /enrollment/{enrollmentId}

const ScheduleView = (props) => {
    
    const headers = ['SecNo', 'CourseId', 'SecId',  'Year', 'Semester', 'Building', 'Room', 'Times', '', ''];


    const [scheduleClasses, setScheduleClasses]  = useState([   ]);
    const [ message, setMessage] = useState('');
    const [search, setSearch] = useState({studentId: '', year: '', semester:''});

    const fetchSchedule = async() => {
        if (search.courseId==='' || search.year==='' || search.semester==='' ) {
            setMessage("Enter search parameters");
        } else {
            try {
                const response = await fetch(`${SERVER_URL}/enrollments?year=${search.year}&semester=${search.semester}&studentId=${search.studentId}`);
                //test values:
                //studentId=3, year=2024, semester=Spring
                //studentId=3, year=2023, semester=Fall
                if (response.ok) {
                    const data = await response.json();
                    setScheduleClasses(data);
                } else {
                    const rc = await response.json();
                    setMessage(rc.message);
                }
            } catch (err) {
                setMessage("network error: " +err);
            }
        }
    }

    useEffect( () => {
        fetchSchedule();
    }, []);

    const editChange = (event) => {
        setSearch({...search, [event.target.name]:event.target.value});
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
                        <tr key={s.secNo}>
                        <td>{s.sectionNo}</td>
                        <td>{s.courseId}</td>
                        <td>{s.sectionId}</td>
                        <td>{s.year}</td>
                        <td>{s.semester}</td>
                        <td>{s.building}</td>
                        <td>{s.room}</td>
                        <td>{s.times}</td>
                        {/* <td><SectionUpdate section={s} onClose={fetchSchedule} /></td> */}
                        {/* <td><Button onClick={onDelete}>Delete</Button></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <SectionAdd  onClose={fetchSchedule} /> */}

        </ >
    );

    
}

export default ScheduleView;