import { action, computed, makeObservable, observable } from 'mobx';
import {
    loadDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../utils/localStorageUtils';
import { IUser } from '../types';
import { mockUsers } from '../mockData/mockData';

const USERS_KEY = 'users';

export class UsersStore {
    constructor() {
        makeObservable(this);
        this.loadUsers();
    }

    @observable authUser: IUser | null = null;
    @observable isAuth = false;
    @observable allUsers: IUser[] = [];
    @observable friendRequests: string[] = [];

    @action loadUsers() {
        const users = loadDataFromLocalStorage<IUser[]>(USERS_KEY) || mockUsers;
        this.allUsers = users;
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    }

    @action setAuthUser(user: IUser) {
        this.authUser = user;
        this.isAuth = true;
        this.setFriendRequests();
    }

    @action setFriendRequests() {
        this.friendRequests = this.authUser?.inFriendRequest || [];
    }

    @action clearAuthUser() {
        this.authUser = null;
        this.isAuth = false;
        this.friendRequests = [];
    }

    @action addUser(user: IUser) {
        this.allUsers.push(user);
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    }

    @action deleteUser(userId: string) {
        this.allUsers = this.allUsers.filter((user) => user.id !== userId);
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    }

    @action addFriend(currentUserId: string, friendId: string) {
        const [friendUser, currentUser] = this.getUsers(
            currentUserId,
            friendId
        );
        friendUser?.inFriendRequest.push(currentUserId);
        currentUser?.outFriendRequest.push(friendId);
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    }

    @action confirmFriendRequest(currentUserId: string, friendId: string) {
        const [friendUser, currentUser] = this.getUsers(
            currentUserId,
            friendId
        );
        if (currentUser && friendUser) {
            currentUser.friends.push(friendId);
            friendUser.friends.push(currentUserId);
            currentUser.inFriendRequest = currentUser.inFriendRequest.filter(
                (id) => id !== friendId
            );
            friendUser.outFriendRequest = friendUser.outFriendRequest.filter(
                (id) => id !== currentUserId
            );
            this.removeFriendRequest(friendId);
            this.setFriendRequests();
            this.authUser = currentUser;
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    }
    @action cancelFriendRequest(currentUserId: string, friendId: string) {
        const [friendUser, currentUser] = this.getUsers(
            currentUserId,
            friendId
        );
        if (currentUser && friendUser) {
            currentUser.inFriendRequest = currentUser.inFriendRequest.filter(
                (id) => id !== friendId
            );
            friendUser.outFriendRequest = friendUser.outFriendRequest.filter(
                (id) => id !== currentUserId
            );
            this.removeFriendRequest(friendId);
            this.setFriendRequests();
            this.authUser = currentUser;
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    }

    @action addFriendRequest(userId: string) {
        this.friendRequests.push(userId);
    }

    @action removeFriendRequest(userId: string) {
        this.friendRequests = this.friendRequests.filter((id) => id !== userId);
    }

    @computed get isFriendRequestSent() {
        return (user: IUser) =>
            this.authUser?.outFriendRequest.includes(user.id) || false;
    }

    @computed get isFriend() {
        return (user: IUser) => {
            if (this.authUser && user) {
                return (
                    this.authUser.friends.includes(user.id) ||
                    user.friends.includes(this.authUser.id)
                );
            }
            return false;
        };
    }

    private getUsers(currentUserId: string, friendId: string) {
        return [
            this.allUsers.find((user) => user.id === friendId),
            this.allUsers.find((user) => user.id === currentUserId),
        ];
    }
}

const usersStore = new UsersStore();
export default usersStore;
