import { IUser } from '../../../types';

import AddPost from './AddPost';
import PostCard from './PostCard';

import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';

import usersStore from '../../../store/users';

const Home = observer(() => {
    const posts = postsStore.posts;
    const comments = commentsStore.comments;

    let currentUser: IUser;
    if (usersStore.authUser) {
        currentUser = usersStore.authUser;
    }

    return (
        <>
            {usersStore.isAuth ? <AddPost /> : null}
            {posts.map((post) => (
                <PostCard
                    isAuth={usersStore.isAuth}
                    post={post}
                    key={post.id}
                    currentUser={currentUser}
                    comments={comments}
                />
            ))}
        </>
    );
});

export default Home;
