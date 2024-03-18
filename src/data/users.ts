import { IUser } from '../types';

export const users: IUser[] = [
    {
        id: '1',
        username: 'John',
        password: 'password',
        email: 'james@gmail.com',
        avatarUrl:
            'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663110850_6-mykaleidoscope-ru-p-spokoinii-chelovek-vkontakte-8.jpg',
        isOnline: false,
        friends: [],
    },
    {
        id: '2',
        password: 'password',
        username: 'Pete',
        email: 'james@gmail.com',
        avatarUrl: 'https://api.dicebear.com/7.x/adventurer-neutral/svg',
        isOnline: true,
        friends: [],
    },
    {
        id: '3',
        password: 'password',
        username: 'Ann',
        email: 'james@gmail.com',
        avatarUrl: 'https://api.dicebear.com/7.x/micah/svg',
        isOnline: false,
        friends: [],
    },
    {
        id: '4',
        password: 'password',
        username: 'Tom',
        email: 'james@gmail.com',
        avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Felix',
        isOnline: true,
        friends: [],
    },
];

export const currentUser = {
    id: '4',
    username: 'Tom',
    email: 'james@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Felix',
    isOnline: true,
    friends: [],
};
