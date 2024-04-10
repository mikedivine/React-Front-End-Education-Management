import React, {useState, useEffect} from 'react';
import { SERVER_URL } from '../../Constants';

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
                const jwt = sessionStorage.getItem('jwt');
                const response = await fetch(`${SERVER_URL}/transcripts`,
                    {headers: {
                        'Authorization' : jwt,
                    }});
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
            <h3>Not implemented</h3>
        </>
    );
}

export default Transcript;