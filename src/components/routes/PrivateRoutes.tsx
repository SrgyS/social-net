import { Friends } from '../pages/friends/Friends';
import Home from '../pages/home/Home';
import Message from '../pages/message/Messages';
import { Navigate } from 'react-router-dom';
import UserProfile from '../pages/profile/UserProfile';
import UsersList from '../pages/users/UsersList';
import Conversation from '../pages/message/Conversation';

export default function privateRoutes() {
    return [
        { path: '/', element: <Home /> },
        { path: '/profile/:id', element: <UserProfile /> },
        { path: '/messages', element: <Message /> },
        { path: '/messages/:id', element: <Conversation /> },
        { path: '/friends', element: <Friends /> },
        { path: '/users', element: <UsersList /> },
        { path: '*', element: <Navigate to='/' replace /> },
    ];
}
