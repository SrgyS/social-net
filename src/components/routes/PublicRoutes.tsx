import Auth from '../pages/auth/Auth';
import { Navigate } from 'react-router-dom';

export default function publicRoutes() {
    return [
        { path: '/login', element: <Auth /> },
        { path: '*', element: <Navigate to='/login' replace /> },
    ];
}
