import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseId, secId} = location.state;
     
    return(
        <> 
           <h3>Not implemented</h3>
        </>
    );
}

export default AssignmentsView;
