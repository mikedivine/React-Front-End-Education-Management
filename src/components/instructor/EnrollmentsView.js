import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

// instructor view list of students enrolled in a section 
// use location to get section no passed from InstructorSectionsView
// fetch the enrollments using URL /sections/{secNo}/enrollments
// display table with columns
//   'enrollment id', 'student id', 'name', 'email', 'grade'
//  grade column is an input field
//  hint:  <input type="text" name="grade" value={e.grade} onChange={onGradeChange} />

const EnrollmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseId, secId} = location.state;

    return(
        <> 
            <h3>Not implemented</h3>   
        </>
    );
}

export default EnrollmentsView;
