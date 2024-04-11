import { Outlet, Link } from "react-router-dom";
import UsersView from './UsersView';
import CoursesView from './CoursesView';
import SectionsView from './SectionsView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from '../../Logout.js'

export const AdminRouter = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLayout />} >
              <Route index element={<AdminHome />} />
              <Route path="users" element={<UsersView />} />
              <Route path="courses" element={<CoursesView />} />
              <Route path="sections" element={<SectionsView />} />
              <Route path="logout" element={<Logout logout={props.logout}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export const AdminHome = () => {

  return (
      <div>
          <h1>Admin Home</h1>
          Manage users, courses and sections.
      </div>
      
      );
};

export const AdminLayout = () => {
  return (
    <>
      <nav>
        <Link id="home" to="/">Home</Link> &nbsp;|&nbsp;   
        <Link id="users" to="/users">Users</Link>&nbsp;|&nbsp;  
        <Link id="courses" to="/courses">Courses</Link>&nbsp;|&nbsp;  
        <Link id="sections" to="/sections">Sections</Link>&nbsp;|&nbsp;  
        <Link id="logout" to="/logout">Logout</Link>
      </nav>

      <Outlet />
    </>
  )
};