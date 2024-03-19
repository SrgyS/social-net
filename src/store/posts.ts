import { action, makeObservable, observable } from 'mobx';

import { IPost } from '../types';

export class PostsStore {
    constructor() {
        makeObservable(this);
    }
    @observable posts: IPost[] = [];

    @action addPost(post: IPost) {
        this.posts.push(post);
        console.log('add post', this.posts);
    }

    @action deletePost(postId: string) {
        this.posts = this.posts.filter((post) => post.id !== postId);
        console.log('delete post');
    }
}

const postsStore = new PostsStore();

export default postsStore;
