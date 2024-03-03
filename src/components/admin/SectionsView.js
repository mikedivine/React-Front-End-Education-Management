import React, {useState} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SectionUpdate from './SectionUpdate';
import SectionAdd from './SectionAdd';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../../Constants';

function SectionsView(props) {
    const headers = ['SecNo', 'CourseId', 'SecId',  'Year', 'Semester', 'Building', 'Room', 'Times', '', ''];
    
    const [sections, setSections] = useState([]);

    const [search, setSearch] = useState({courseId:'', year:'', semester:''});

    const [message, setMessage] = useState('');

    const fetchSections = async () => {
        if (search.courseId==='' || search.year==='' || search.semester==='' ) {
            setMessage("Enter search parameters");
        } else {
          try {
            const response = await fetch(`${SERVER_URL}/course/${search.courseId}/sections?year=${search.year}&semester=${search.semester}`);
            if (response.ok) {
              const data = await response.json();
              setSections(data);
            } else {
              const rc = await response.json();
              setMessage(rc.message);
            }
          } catch(err) {
            setMessage("network error: "+err);
          }
        }
    }

    const saveSection = async (section) => {
      try {
        const response = await fetch (`${SERVER_URL}/sections`, 
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(section),
          });
        if (response.ok) {
          setMessage("section saved");
          fetchSections();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const addSection = async (section) => {
      try {
        const response = await fetch (`${SERVER_URL}/sections`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(section),
          });
        if (response.ok) {
          const rc = await response.json();
          setMessage("section added secno="+rc.secNo);
          fetchSections();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const deleteSection = async (secNo) => {
      try {
        const response = await fetch (`${SERVER_URL}/sections/${secNo}`, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }, 
        });
        if (response.ok) {
          setMessage("Section deleted");
          fetchSections();
        } else {
          const rc = await response.json();
          setMessage(rc.message);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }
    }
    

    const editChange = (event) => {
        setSearch({...search,  [event.target.name]:event.target.value});
    }

    const onDelete = (e) => {
      const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
      const secNo = sections[row_idx].secNo;
      confirmAlert({
          title: 'Confirm to delete',
          message: 'Do you really want to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteSection(secNo)
            },
            {
              label: 'No',
            }
          ]
        });
    }

    return(
        <div> 
            <h3>Sections</h3>    
          
            <h4>{message}</h4>
            <h4>Enter course prefix, year, semester.  Example  cst 2024 Spring</h4>
            <table className="Center">
                <tbody>
                <tr>
                    <td>Course Prefix:</td>
                    <td><input type="text" id="courseId" name="courseId" value={search.courseId} onChange={editChange} /></td>
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
            <button type="submit" onClick={fetchSections} >Search for Sections</button>
            <br/>
            <br/>
            <table className="Center" > 
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {sections.map((s) => (
                        <tr key={s.secNo}>
                        <td>{s.secNo}</td>
                        <td>{s.courseId}</td>
                        <td>{s.secId}</td>
                        <td>{s.year}</td>
                        <td>{s.semester}</td>
                        <td>{s.building}</td>
                        <td>{s.room}</td>
                        <td>{s.times}</td>
                        <td><SectionUpdate section={s} save={saveSection} /></td>
                        <td><Button onClick={onDelete}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SectionAdd save={addSection} />
        </div>
    );
}
export default SectionsView;