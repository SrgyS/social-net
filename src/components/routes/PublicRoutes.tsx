import Home from '../pages/home/Home';
import { Navigate } from 'react-router-dom';

export default function publicRoutes() {
    return [
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to='/' replace /> },
    ];
}
