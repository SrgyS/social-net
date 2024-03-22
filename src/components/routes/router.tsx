import AppLayout from '../layout/AppLayout';
import { createBrowserRouter } from 'react-router-dom';
import privateRoutes from './PrivateRoutes';
import publicRoutes from './PublicRoutes';
import usersStore from '../../store/users';

const createRouter = () => {
    const isAuth = !!usersStore.authUser;
    const routes = isAuth ? privateRoutes() : publicRoutes();
    return createBrowserRouter([
        { path: '/', element: <AppLayout />, children: [...routes] },
    ]);
};

export default createRouter;
