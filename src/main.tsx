import './index.css';

import App from './app';
import { DataStoreProvider } from './store/context';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import { spy } from 'mobx';

// spy((ev) => {
//     console.log(ev);
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DataStoreProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </DataStoreProvider>
);
