import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CourseUpdate from './CourseUpdate';
import CourseAdd from './CourseAdd';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../../Constants';

function CoursesView(props) {
    const headers = ['CourseId', 'Title', 'Credits',  '', ''];
    
    const [courses, setCourses] = useState([    ]);

    const [ message, setMessage ] = useState('');

    const  fetchCourses = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/courses`);
        if (response.ok) {
          const courses = await response.json();
          setCourses(courses);
        } else {
          const json = await response.json();
          setMessage("response error: "+json.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }  
    }

    useEffect( () => { 
      fetchCourses();
    },  []);

    const saveCourse = async (course) => {
      try {
        const response = await fetch (`${SERVER_URL}/courses`, 
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify(course),
            });
        if (response.ok) {
          setMessage("course saved")
          fetchCourses();
        } else {
          const json = await response.json();
          setMessage("response error: "+json.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const addCourse = async (course) => {
      try {
        const response = await fetch (`${SERVER_URL}/courses`, 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify(course),
            });
        if (response.ok) {
          setMessage("course added")
          fetchCourses();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const deleteCourse = async (courseId) => {
      try {
        const response = await fetch (`${SERVER_URL}/courses/${courseId}`, 
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }, 
            });
        if (response.ok) {
          setMessage("Course deleted");
          fetchCourses();
        } else {
          const rc = await response.json();
          setMessage("Delete failed "+rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }
    
    const onDelete = (e) => {
      const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
      const courseId = courses[row_idx].courseId;
      confirmAlert({
          title: 'Confirm to delete',
          message: 'Do you really want to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteCourse(courseId)
            },
            {
              label: 'No',
            }
          ]
        });
    }

    return(
        <div> 
            <h3>Courses</h3>   
            <h4>{message}</h4>     
            <table className="Center" > 
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {courses.map((c) => (
                        <tr key={c.courseId}>
                        <td>{c.courseId}</td>
                        <td>{c.title}</td>
                        <td>{c.credits}</td>
                        <td><CourseUpdate course={c} save={saveCourse} /></td>
                        <td><Button onClick={onDelete}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CourseAdd save={addCourse} />
        </div>
    );
}
export default CoursesView;

