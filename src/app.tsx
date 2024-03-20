import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import createRouter from './components/routes/router';
import { observer } from 'mobx-react-lite';

const App: FC = observer(() => {
    const router = createRouter();

    return <RouterProvider router={router} />;
});

export default App;
