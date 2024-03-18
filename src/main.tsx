import './index.css';

import { DataStoreProvider } from './store/context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/routes/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DataStoreProvider>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </DataStoreProvider>
);
