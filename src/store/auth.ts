import { IAuthFormValues } from '../types';
import { makeAutoObservable } from 'mobx';

class Auth {
    isAuthenticated = false;
    authUser: IAuthFormValues | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    setAuthUser(user: IAuthFormValues) {
        this.authUser = user;
        this.isAuthenticated = true;
        console.log('login success');
    }

    clearAuthUser() {
        this.authUser = null;
        this.isAuthenticated = false;
        console.log('logout success');
    }
}

export default new Auth();
