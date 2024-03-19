import { action, makeObservable, observable } from 'mobx';

import { IComment } from '../types';

export class CommentsStore {
    constructor() {
        makeObservable(this);
    }
    @observable comments: IComment[] = [];

    @action addComment(comment: IComment) {
        this.comments.push(comment);
        console.log('add comment', this.comments);
    }

    @action deleteComment(commentId: string) {
        this.comments = this.comments.filter(
            (comment) => comment.id !== commentId
        );
        console.log('delete post');
    }
}

const commentsStore = new CommentsStore();

export default commentsStore;
