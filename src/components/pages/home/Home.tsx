import { useEffect, useState } from 'react';

import AddPost from './AddPost';
import { IPost } from '../../../types';
import PostCard from './PostCard';
import { comments } from '../../../data/comments';
import { currentUser } from '../../../data/users';
import usersStore from '../../../store/users';

const Home = () => {
    useEffect(() => {
        console.log(usersStore.isAuth);
    }, [usersStore.isAuth]);

    const [posts, setPosts] = useState<IPost[]>([
        {
            id: '1',
            author: {
                id: '1',
                username: 'John',
                email: 'james@gmail.com',
                avatarUrl:
                    'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663110850_6-mykaleidoscope-ru-p-spokoinii-chelovek-vkontakte-8.jpg',
                isOnline: false,
                friends: [],
                password: '',
            },
            content: 'просто какой-то текст',
            createdAt: 'new Date()',
            comments: [],
        },
        {
            id: '2323',
            author: {
                id: '3',
                username: 'Ann',
                email: 'james@gmail.com',
                avatarUrl: 'https://api.dicebear.com/7.x/micah/svg',
                isOnline: false,
                friends: [],
                password: '',
            },
            content: 'еще один пост',
            createdAt: '',
            comments: [],
        },
    ]);

    return (
        <>
            <AddPost setPosts={setPosts} />
            {posts.map((post) => (
                <PostCard
                    post={post}
                    key={post.id}
                    currentUser={currentUser}
                    comments={comments}
                />
            ))}
        </>
    );
};

export default Home;
