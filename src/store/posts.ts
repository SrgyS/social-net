import { action, makeObservable, observable } from 'mobx';
import {
    loadDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../utils/localStorageUtils';

import { IPost } from '../types';
import { mockPosts } from '../mockData/mockData';

const POSTS_KEY = 'posts';
export class PostsStore {
    constructor() {
        makeObservable(this);
        this.loadPosts();
    }
    @observable allPosts: IPost[] = [];

    @action loadPosts() {
        const posts: IPost[] | null = loadDataFromLocalStorage(POSTS_KEY);
        if (!posts) {
            this.allPosts = mockPosts;
            saveDataToLocalStorage(POSTS_KEY, this.allPosts);
        } else {
            this.allPosts = posts as IPost[];
        }
    }

    @action addPost(post: IPost) {
        this.allPosts.push(post);
        saveDataToLocalStorage(POSTS_KEY, this.allPosts);
    }

    @action deletePost(postId: string) {
        this.allPosts = this.allPosts.filter((post) => post.id !== postId);
        saveDataToLocalStorage(POSTS_KEY, this.allPosts);
        console.log('delete from store');
    }

    // @action getUserPosts(userId: string) {
    //     return this.allPosts.filter((post) => post.author.id === userId);
    // }
}

const postsStore = new PostsStore();

export default postsStore;
