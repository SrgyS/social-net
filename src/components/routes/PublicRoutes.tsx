import Home from '../pages/home/Home';
import { Navigate } from 'react-router-dom';
import UserProfile from '../pages/profile/UserProfile';

export default function publicRoutes() {
    return [
        { path: '/', element: <Home /> },
        { path: '/profile/:id', element: <UserProfile /> },
        { path: '*', element: <Navigate to='/' replace /> },
    ];
}
