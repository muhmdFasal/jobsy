// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';
// import AboutUs from './components/Aboutus/AboutUs';
// import Faqs from './components/Faqs/Faqs';
// import Layout from './components/Layout';
// import HomePage from './components/Home/HomePage';
// import Post from './components/Post';
// import MyApplications from './components/MyApplications';
// import SavedJobs from './components/SavedJobs';
// import AuthHandler from './components/shared/AuthHandler';
// import Profile from './components/Profile';
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthHandler />} />

//         {/* Public routes */}
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/faqs" element={<Faqs />} />

//         {/* Feed - nested routes */}
//         <Route path="/feed" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="posts" element={<Post />} />
//           <Route path="applications" element={<MyApplications />} />
//           <Route path="saved-jobs" element={<SavedJobs />} />
//           {/* <Route path="jobs" element={<Post />} /> */}
//           <Route path="profile" element={<Profile />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';
// import AboutUs from './components/Aboutus/AboutUs';
// import Faqs from './components/Faqs/Faqs';
// import Layout from './components/Layout';
// import HomePage from './components/Home/HomePage';
// import Post from './components/Post';
// import MyApplications from './components/MyApplications';
// import SavedJobs from './components/SavedJobs';
// import AuthHandler from './components/shared/AuthHandler';
// import Profile from './components/Profile';
// import AdminDashboard from './components/AdminDashboard';

// import AdminRoute from './components/AdminRoute'; // import AdminRoute

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthHandler />} />

//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/faqs" element={<Faqs />} />

//         {/* Protected admin route */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//         {/* Feed - nested routes */}
//         <Route path="/feed" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="posts" element={<Post />} />
//           <Route path="applications" element={<MyApplications />} />
//           <Route path="saved-jobs" element={<SavedJobs />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// // export default App;
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
// import AdminCompanies from './components/AdminCompanies'; // ✅ new admin companies management component
// import AuthHandler from './components/shared/AuthHandler';
// import AdminRoute from './components/AdminRoute'; // ✅ protects admin-only routes
// import AdminDashboardHome from './components/AdminDashboardHome'; // ✅ new admin dashboard home component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Root path: auto-redirects based on role */}
//         <Route path="/" element={<AuthHandler />} />

//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/faqs" element={<Faqs />} />

     
//         <Route
//           path="/admin/jobs"
//           element={
//             <AdminRoute>
//               <JobPostForm />
//             </AdminRoute>
//           }
//         />
// <Route
//   path="/admin-dashboard"
//   element={
//     <AdminRoute>
//       <AdminDashboard />
//     </AdminRoute>
//   }
// >
//   <Route index element={<AdminDashboardHome />} /> {/* /admin-dashboard */}
//   <Route path="manage-companies" element={<AdminCompanies />} />
//   {/* Add more nested admin pages if needed */}
// </Route>
//         {/* User-Authenticated Routes (Feed) */}
//         <Route path="/feed" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="posts" element={<Post />} />
//           <Route path="applications" element={<MyApplications />} />
//           <Route path="saved-jobs" element={<SavedJobs />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="jobs" element={<JobList />} />
//         </Route>
//         {/* Admin Companies Management */}
//         <Route
//           path="/admin/companies"
//           element={
//             <AdminRoute>
//               <AdminCompanies />
//             </AdminRoute>
//           }
//         />

//         {/* Catch-all: redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
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
// import ManageUsers from './components/ManageUsers'; // ✅ New Manage Users page

// import AuthHandler from './components/shared/AuthHandler';
// import AdminRoute from './components/AdminRoute';
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
          <Route index element={<AdminDashboardHome />} /> {/* /admin-dashboard */}
          <Route path="manage-companies" element={<AdminCompanies />} /> {/* /admin-dashboard/manage-companies */}
          <Route path="manage-users" element={<ManageUsers />} /> {/* /admin-dashboard/manage-users */}
        </Route>

        {/* Authenticated User Layout */}
        <Route path="/feed" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts" element={<Post />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<JobList />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
