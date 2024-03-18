import { action, observable } from 'mobx';

import { IAuthFormValues } from '../types';

export class UsersStore {
    @observable authUser: IAuthFormValues | null = null;
    @observable isAuth: boolean = false;

    @action setAuthUser(user: IAuthFormValues) {
        this.authUser = user;
        this.isAuth = true;
        console.log('login success');
    }

    @action clearAuthUser() {
        this.authUser = null;
        this.isAuth = false;
        console.log('logout success');
    }
}

const usersStore = new UsersStore();

export default usersStore;
