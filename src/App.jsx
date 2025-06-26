import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AboutUs from './components/Aboutus/AboutUs';
import Faqs from './components/Faqs/Faqs';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import Post from './components/Post';
import MyApplications from './components/MyApplications';
import SavedJobs from './components/SavedJobs';
import AuthHandler from './components/shared/AuthHandler';
import Profile from './components/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHandler />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />

        {/* Feed - nested routes */}
        <Route path="/feed" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts" element={<Post />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
