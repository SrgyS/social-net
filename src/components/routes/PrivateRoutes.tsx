import AppLayout from '../layout/AppLayout';
import Home from '../pages/home/Home';
import { Navigate } from 'react-router-dom';
import Profile from '../pages/profile/Profile';

export default function privateRoutes() {
    return {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/profile', element: <Profile /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ],
    };
}
