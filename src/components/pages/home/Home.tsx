import AddPost from './AddPost';
import { IUser } from '../../../types';
import PostCard from './PostCard';
import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const Home = observer(() => {
    const posts = [...postsStore.allPosts].reverse();
    const comments = commentsStore.allComments;

    let currentUser: IUser;
    if (usersStore.authUser) {
        currentUser = usersStore.authUser;
    }

    return (
        <>
            {usersStore.authUser ? <AddPost /> : null}
            {posts.map((post) => (
                <PostCard
                    isAuth={!!usersStore.authUser}
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
