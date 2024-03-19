import AppLayout from '../layout/AppLayout';
import Home from '../pages/home/Home';
import Message from '../pages/message/Message';
import { Navigate } from 'react-router-dom';
import UserProfile from '../pages/profile/UserProfile';
import UsersList from '../pages/users/UsersList';

export default function privateRoutes() {
    return {
        path: '/',
        element: <AppLayout />,

        children: [
            { path: '/', element: <Home /> },
            { path: '/profile/:id', element: <UserProfile /> },
            { path: '/messages', element: <Message /> },
            { path: '/friends', element: <Message /> },
            { path: '/users', element: <UsersList /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ],
    };
}
