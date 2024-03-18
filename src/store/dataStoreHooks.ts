import { StoreContext } from './context';
import { useContext } from 'react';

export const useDataStore = () => {
    const store = useContext(StoreContext);

    if (!store) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return store;
};
