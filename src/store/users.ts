import { action, makeObservable, observable } from 'mobx';

import { IUser } from '../types';
import axios from 'axios';

export class UsersStore {
    constructor() {
        makeObservable(this);
        this.loadAllUsers();
    }
    @observable authUser: IUser | null = null;
    @observable isAuth: boolean = false;
    @observable allUsers: IUser[] = [];

    @action setAuthUser(user: IUser) {
        this.authUser = user;
        this.isAuth = true;
    }

    @action clearAuthUser() {
        this.authUser = null;
        this.isAuth = false;
    }

    @action async loadAllUsers() {
        try {
            const response = await axios.get('http://localhost:3001/users');
            this.allUsers = response.data;
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    }

    @action async addUser(user: IUser) {
        try {
            const response = await axios.post(
                'http://localhost:3001/users',
                user
            );
            this.allUsers.push(response.data);
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    }

    @action async deleteUser(userId: string) {
        try {
            await axios.delete(`http://localhost:3001/users/${userId}`);
            this.allUsers = this.allUsers.filter((user) => user.id !== userId);
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    }

    @action async addFriend(currentUserId: string, friendId: string) {
        try {
            const currentUser = this.allUsers.find(
                (user) => user.id === currentUserId
            );
            const friendUser = this.allUsers.find(
                (user) => user.id === friendId
            );

            if (currentUser && friendUser) {
                currentUser.friends.push(friendId);
                friendUser.friends.push(currentUserId);

                await axios.put(
                    `http://localhost:3001/users/${currentUserId}`,
                    currentUser
                );
                await axios.put(
                    `http://localhost:3001/users/${friendId}`,
                    friendUser
                );
            } else {
                console.error('Пользователи не найдены');
            }
        } catch (error) {
            console.error('Ошибка при добавлении друга:', error);
        }
    }
}

const usersStore = new UsersStore();

export default usersStore;
