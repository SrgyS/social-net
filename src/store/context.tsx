import { ReactNode, createContext } from 'react';
import { Store, createStore } from './store';

import { useLocalObservable } from 'mobx-react-lite';

export const StoreContext = createContext<Store | null>(null);

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
    const store = useLocalObservable(createStore);

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
