import AppLayout from '../layout/AppLayout';
import Home from '../pages/home/Home';
import Message from '../pages/message/Message';
import { Navigate } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import { RequireAuth } from './RequireAuth';

export default function privateRoutes() {
    return {
        element: <AppLayout />,

        children: [
            { path: '/', element: <Home /> },
            { path: '/profile/:id', element: <Profile /> },
            { path: '/messages', element: <Message /> },
            { path: '/friends', element: <Message /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ],
    };
}
