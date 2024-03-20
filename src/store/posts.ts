import { action, makeObservable, observable } from 'mobx';

import { IPost } from '../types';
import axios from 'axios';

export class PostsStore {
    constructor() {
        makeObservable(this);
        this.loadPosts();
    }
    @observable posts: IPost[] = [];

    @action async loadPosts() {
        try {
            const response = await axios.get('http://localhost:3001/posts');
            this.posts = response.data;
        } catch (error) {
            console.error('Ошибка при загрузке постов:', error);
        }
    }
    @action async addPost(post: IPost) {
        try {
            const response = await axios.post(
                'http://localhost:3001/posts',
                post
            );
            this.posts.push(response.data);
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    }

    @action async deletePost(postId: string) {
        try {
            await axios.delete(`http://localhost:3001/posts/${postId}`);
            this.posts = this.posts.filter((post) => post.id !== postId);
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
        }
    }
}

const postsStore = new PostsStore();

export default postsStore;
