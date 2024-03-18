import AppLayout from '../layout/AppLayout';
import Home from '../pages/home/Home';
import { Navigate } from 'react-router-dom';

export default function publicRoutes() {
    return [
        {
            element: <AppLayout />,
            children: [
                { path: '/', element: <Home /> },
                { path: '*', element: <Navigate to='/login' replace /> },
            ],
        },
    ];
}
