import './App.css';
import React, {useState } from 'react';
import {AdminRouter} from './components/admin/AdminLayout';
import {StudentRouter} from './components/student/StudentLayout';
import {InstructorRouter} from './components/instructor/InstructorLayout';
import Login from './Login';


function App() {

  const[isAuthenticated, setAuth] = useState(false);
  const[userType, setUserType] = useState('');

  const logout = () => {
    setAuth(false);
    sessionStorage.removeItem("jwt");
  }

  if (! isAuthenticated) {
      return (
        <Login setAuth={setAuth} setUserType={setUserType} />
      );
  } else if (userType==='ADMIN') {
      return (
        <AdminRouter logout={logout}/>
      )
  } else if (userType==='STUDENT') {
      return (
        <StudentRouter logout={logout}/>
      )

  } else if (userType==='INSTRUCTOR') {
    return (
      <InstructorRouter logout={logout} />
    )

  } else {
    return <h1>Unknown user type</h1>

  }
}

export default App;
