import { Dispatch, SetStateAction } from 'react';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    avatarUrl?: string;
    isOnline: boolean;
    friends: string[];
    posts?: string[];
    inFriendRequest: string[];
    outFriendRequest: string[];
    unreadMessages: string[];
}

export interface IPost {
    author: IUser;
    id: string;
    content: string;
    createdAt: string;
    imgUrls: string[] | null;
}

export interface IComment {
    id: string;
    postId: string;
    author: IUser;
    createdAt: string;
    content: string;
}

export interface IAuthFormValues {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    avatarUrl?: string;
}
export interface ILoginFormValues {
    email: string;
    password: string;
}

export interface IMessage {
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: number;
    id: string;
}
