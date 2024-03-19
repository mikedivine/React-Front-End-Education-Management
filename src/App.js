import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from './components/admin/UsersView';
import CoursesView from './components/admin/CoursesView';
import SectionsView from './components/admin/SectionsView';
import {AdminHome, AdminLayout} from './components/admin/AdminLayout';
import {StudentLayout, StudentHome} from './components/student/StudentLayout';
import ScheduleView from './components/student/ScheduleView';
import Transcript from './components/student/Transcript';
import StudentAssignmentsView from './components/student/AssignmentsStudentView';
import InstructorLayout from './components/instructor/InstructorLayout';
import InstructorHome from './components/instructor/InstructorHome';
import AssignmentsView from './components/instructor/AssignmentsView';
import EnrollmentsView from './components/instructor/EnrollmentsView';
import InstructorSectionsView from './components/instructor/InstructorSectionsView';
import CourseEnrollment from './components/student/CourseEnroll';
import AssignmentGrade from './components/instructor/AssignmentGrade';

function App() {

  // change to INSTRUCTOR or STUDENT for testing.  
  // when login is implemented, the user type will come from the logged in user's ROLE.

  const userType = 'STUDENT'; // change to INSTRUCTOR or STUDENT for testing.


  if (userType==='ADMIN') {
    return (
      <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="users" element={<UsersView />} />
              <Route path="courses" element={<CoursesView />} />
              <Route path="sections" element={<SectionsView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  } else if (userType==='STUDENT') {
    return (
      <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentLayout />}>
              <Route index element={<StudentHome />} />
              <Route path="schedule" element={<ScheduleView />} />
              <Route path="studentAssignments" element={<StudentAssignmentsView />} />
              <Route path="transcript" element={<Transcript />} />
              <Route path="addCourse" element={<CourseEnrollment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  } else if (userType==='INSTRUCTOR') {
    return (
      <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<InstructorLayout />}>
              <Route index element={<InstructorHome />} />
              <Route path="assignments" element={<AssignmentsView />} />
              <Route path="assignmentGrades" element={<AssignmentGrade />} />
              <Route path="enrollments" element={<EnrollmentsView />} />
              <Route path="sections" element={<InstructorSectionsView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )

  } else {
    return <h1>Unknown user type</h1>

  }
}
export default App;
