import './index.css';

import App from './app';
import { DataStoreProvider } from './store/context';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DataStoreProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </DataStoreProvider>
);
