import { Navigate } from 'react-router-dom';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';


const AuthHandler = () => {

    const token = localStorage.getItem('token');

    if (token) {
        // User is authenticated—redirect them to the feed
        return <Navigate to="/feed" replace />;
    }

    // Not authenticated—send to login page
    // return <Navigate to="/login" replace />;
      return <WelcomeScreen />;


}

export default AuthHandler
