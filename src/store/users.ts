import { IMessage, IUser } from '../types';
import { action, computed, makeObservable, observable } from 'mobx';
import {
    loadDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../utils/localStorageUtils';
import { mockMessages, mockUsers } from '../mockData/mockData';

const USERS_KEY = 'users';
const MESSAGES_KEY = 'messages';

export class UsersStore {
    constructor() {
        makeObservable(this);
        this.loadUsers();
        this.loadMessages();
    }

    @observable authUser: IUser | null = null;
    @observable allUsers: IUser[] = [];
    @observable messages: IMessage[] = [];

    @action loadUsers() {
        const users = loadDataFromLocalStorage<IUser[]>(USERS_KEY) || mockUsers;
        this.allUsers = users;
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    }

    @action loadMessages = () => {
        const messages =
            loadDataFromLocalStorage<IMessage[]>(MESSAGES_KEY) || mockMessages;
        this.messages = messages;
        saveDataToLocalStorage(MESSAGES_KEY, this.messages);
    };

    @action setAuthUser = (user: IUser) => {
        this.authUser = user;
    };

    @action clearAuthUser = () => {
        this.authUser = null;
    };

    @action addUser = (user: IUser) => {
        this.allUsers.push(user);
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    };

    @action addFriendRequest = (currentUserId: string, friendId: string) => {
        const [friendUser, currentUser] = this.getUsers(
            currentUserId,
            friendId
        );
        if (currentUser && friendUser) {
            friendUser.inFriendRequest.push(currentUserId);
            currentUser.outFriendRequest.push(friendId);
            this.setAuthUser(currentUser);
        }
        saveDataToLocalStorage(USERS_KEY, this.allUsers);
    };

    @action confirmFriendRequest = (
        currentUserId: string,
        friendId: string
    ) => {
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
            this.setAuthUser(currentUser);
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    };
    @action deleteFriend = (currentUserId: string, friendId: string) => {
        const [friendUser, currentUser] = this.getUsers(
            currentUserId,
            friendId
        );
        if (currentUser && friendUser) {
            currentUser.friends = currentUser.friends.filter(
                (user) => user !== friendId
            );
            friendUser.friends = friendUser.friends.filter(
                (user) => user !== currentUserId
            );

            this.setAuthUser(currentUser);
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    };

    @action cancelFriendRequest = (currentUserId: string, friendId: string) => {
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
            this.authUser = currentUser;
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    };

    @computed get isFriendRequestSent() {
        return (user: IUser) => {
            return !!(
                this.authUser &&
                this.authUser.outFriendRequest.includes(user.id)
            );
        };
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

    @action sendMessage(message: IMessage) {
        this.messages.push(message);
        saveDataToLocalStorage(MESSAGES_KEY, this.messages);

        const receiverUser = this.allUsers.find(
            (user: IUser) => user.id === message.receiverId
        );

        if (receiverUser) {
            receiverUser.unreadMessages.push(message.id);
            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    }

    @computed get getConversation() {
        return (senderId: string, receiverId: string) => {
            return this.messages.filter(
                (message) =>
                    (message.senderId === senderId &&
                        message.receiverId === receiverId) ||
                    (message.senderId === receiverId &&
                        message.receiverId === senderId)
            );
        };
    }

    @computed get getUnreadMessagesCount() {
        return (userId: string) => {
            const receivedMessages = this.messages.filter(
                (message) =>
                    message.receiverId === this.authUser?.id &&
                    message.senderId === userId
            );
            const unreadMessagesCount = receivedMessages.filter(
                (message) =>
                    this.authUser?.unreadMessages.includes(message.id) || false
            ).length;
            return unreadMessagesCount;
        };
    }

    @action markMessagesAsRead = (userId: string) => {
        const currentUser = this.allUsers?.find(
            (user) => user.id === this.authUser?.id
        );
        const otherUser = this.allUsers.find((user) => user.id === userId);

        if (currentUser && otherUser) {
            const conversation = this.getConversation(
                currentUser.id,
                otherUser.id
            );
            currentUser.unreadMessages = currentUser.unreadMessages.filter(
                (messageId) =>
                    !conversation.some((message) => message.id === messageId)
            );

            saveDataToLocalStorage(USERS_KEY, this.allUsers);
        }
    };

    private getUsers(currentUserId: string, friendId: string) {
        return [
            this.allUsers.find((user) => user.id === friendId),
            this.allUsers.find((user) => user.id === currentUserId),
        ];
    }
}

const usersStore = new UsersStore();
export default usersStore;
