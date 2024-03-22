import { action, makeObservable, observable } from 'mobx';
import {
    loadDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../utils/localStorageUtils';

import { IComment } from '../types';
import { mockComments } from '../mockData/mockData';

const COMMENTS_KEY = 'comments';

export class CommentsStore {
    constructor() {
        makeObservable(this);
        this.loadComments();
    }
    @observable allComments: IComment[] = [];

    @action loadComments() {
        const comments: IComment[] | null =
            loadDataFromLocalStorage(COMMENTS_KEY);

        if (!comments) {
            this.allComments = mockComments;
            saveDataToLocalStorage(COMMENTS_KEY, this.allComments);
        } else {
            this.allComments = comments;
        }
    }

    @action
    addComment(comment: IComment) {
        this.allComments.push(comment);
        saveDataToLocalStorage(COMMENTS_KEY, this.allComments);
    }

    @action deleteComment(commentId: string) {
        this.allComments = this.allComments.filter(
            (comment) => comment.id !== commentId
        );
        saveDataToLocalStorage(COMMENTS_KEY, this.allComments);
    }
}

const commentsStore = new CommentsStore();

export default commentsStore;
