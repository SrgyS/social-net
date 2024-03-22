import { CommentsStore } from './comments';
import { PostsStore } from './posts';
import { UsersStore } from './users';

export function createStore() {
    return {
        users: new UsersStore(),
        posts: new PostsStore(),
        comments: new CommentsStore(),
    };
}
export type Store = ReturnType<typeof createStore>;
