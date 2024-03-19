import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([PrivateRoutes()]);
