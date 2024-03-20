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

    @action async loadPosts() {
        const posts: IPost[] | null = loadDataFromLocalStorage(POSTS_KEY);
        if (!posts) {
            this.allPosts = mockPosts;
            saveDataToLocalStorage(POSTS_KEY, this.allPosts);
        } else {
            this.allPosts = posts as IPost[];
        }
    }

    @action async addPost(post: IPost) {
        this.allPosts.push(post);
        saveDataToLocalStorage(POSTS_KEY, this.allPosts);
    }

    @action async deletePost(postId: string) {
        this.allPosts = this.allPosts.filter((post) => post.id !== postId);
        saveDataToLocalStorage(POSTS_KEY, this.allPosts);
    }
}

const postsStore = new PostsStore();

export default postsStore;
