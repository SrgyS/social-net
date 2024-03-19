import { action, makeObservable, observable } from 'mobx';

import { IUser } from '../types';

export class UsersStore {
    constructor() {
        makeObservable(this);
    }
    @observable authUser: IUser | null = null;
    @observable isAuth: boolean = false;
    @observable allUsers: IUser[] = [];

    @action setAuthUser(user: IUser) {
        this.authUser = user;
        this.isAuth = true;
        console.log('login success', this.isAuth);
    }

    @action clearAuthUser() {
        this.authUser = null;
        this.isAuth = false;
        console.log('logout success', this.isAuth);
    }

    @action getAllUsers(users: IUser[]) {
        this.allUsers = users;
    }
}
const usersStore = new UsersStore();

export default usersStore;
