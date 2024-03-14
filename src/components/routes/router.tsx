import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { createBrowserRouter } from 'react-router-dom';

const isAuth = true;

export const router = createBrowserRouter([
    isAuth ? PrivateRoutes() : {},
    ...PublicRoutes(),
]);
