import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AboutUs from './components/Aboutus/AboutUs';
import Faqs from './components/Faqs/Faqs';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />


        <Route path="/feed" element={<Layout />}>
          <Route index element={<HomePage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;



