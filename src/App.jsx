
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';
// import AboutUs from './components/Aboutus/AboutUs';
// import Faqs from './components/Faqs/Faqs';
// import Layout from './components/Layout';
// import HomePage from './components/Home/HomePage';
// import Post from './components/Post';
// import MyApplications from './components/MyApplications';
// import SavedJobs from './components/SavedJobs';
// import Profile from './components/Profile';
// import JobPostForm from './components/JobPostForm';
// import JobList from './components/JobList';

// import AdminDashboard from './components/AdminDashboard';
// import AdminDashboardHome from './components/AdminDashboardHome';
// import AdminCompanies from './components/AdminCompanies';
// import ManageUsers from './components/ManageUsers';

// import AuthHandler from './components/shared/AuthHandler';
// import AdminRoute from './components/AdminRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Root: role-based redirect */}
//         <Route path="/" element={<AuthHandler />} />

//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/faqs" element={<Faqs />} />

//         {/* Admin-only job posting */}
//         <Route
//           path="/admin/jobs"
//           element={
//             <AdminRoute>
//               <JobPostForm />
//             </AdminRoute>
//           }
//         />

//         {/* Admin Dashboard Layout with nested routes */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         >
//           <Route index element={<AdminDashboardHome />} /> {/* /admin-dashboard */}
//           <Route path="manage-companies" element={<AdminCompanies />} /> {/* /admin-dashboard/manage-companies */}
//           <Route path="manage-users" element={<ManageUsers />} /> {/* /admin-dashboard/manage-users */}
//         </Route>

//         {/* Authenticated User Layout */}
//         <Route path="/feed" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="posts" element={<Post />} />
//           <Route path="applications" element={<MyApplications />} />
//           <Route path="saved-jobs" element={<SavedJobs />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="jobs" element={<JobList />} />
//         </Route>
          
//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AboutUs from './components/Aboutus/AboutUs';
import Faqs from './components/Faqs/Faqs';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import Post from './components/Post';
import MyApplications from './components/MyApplications';
import SavedJobs from './components/SavedJobs';
import Profile from './components/Profile';
import JobPostForm from './components/JobPostForm';
import JobList from './components/JobList';

import AdminDashboard from './components/AdminDashboard';
import AdminDashboardHome from './components/AdminDashboardHome';
import AdminCompanies from './components/AdminCompanies';
import ManageUsers from './components/ManageUsers';

 
import AuthHandler from './components/shared/AuthHandler';
import AdminRoute from './components/AdminRoute';
import CompanyRoute from './components/CompanyRoutes';
import CompanyJobs from './components/CompanyJobs';
import AppliedUsers from './components/AppliedUsers';
import ApplyToJob from './components/ApplyToJob';
function App() {
  return (
    <Router>
      <Routes>
        {/* Root: role-based redirect */}
        <Route path="/" element={<AuthHandler />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />

        {/* Admin-only job posting */}
        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <JobPostForm />
            </AdminRoute>
          }
        />

        {/* Admin Dashboard Layout with nested routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="manage-companies" element={<AdminCompanies />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>

        {/* ✅ Company (TPO) Dashboard */}
        <Route
          path="/company-dashboard"
          element={
            <CompanyRoute>
              <CompanyJobs />
            </CompanyRoute>
          }
        />

        {/* Authenticated User Layout */}
        <Route path="/feed" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts" element={<Post />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job" element={<JobList />} />
          <Route path="post-job" element={<JobPostForm />} />
          <Route path="applicants" element={<AppliedUsers />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
