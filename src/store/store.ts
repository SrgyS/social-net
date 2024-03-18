import { UsersStore } from './users';

export function createStore() {
    return {
        users: new UsersStore(),
    };
}
export type Store = ReturnType<typeof createStore>;
