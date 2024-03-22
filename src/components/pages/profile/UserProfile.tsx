import { Avatar, Button, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
    MessageOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import { FC } from 'react';
import { IUser } from '../../../types';
import PostCard from '../home/PostCard';
import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const UserProfile: FC = observer(() => {
    const { isFriendRequestSent, isFriend } = usersStore;
    const { id } = useParams<{ id: string }>();
    const user = usersStore.allUsers.find((user) => user.id === id);
    let currentUser: IUser;
    if (usersStore.authUser) {
        currentUser = usersStore.authUser;
    }

    const isRequestSent = user ? isFriendRequestSent(user) : false;
    const friend = user ? isFriend(user) : false;

    const userPosts = user ? postsStore.getUserPosts(user.id) : [];
    const comments = commentsStore.allComments;

    const handleAddFriend = () => {
        if (user) {
            usersStore.addFriendRequest(usersStore.authUser!.id, user.id);
        }
    };

    const handleDeleteFriend = () => {
        if (user) {
            usersStore.deleteFriend(currentUser.id, user.id);
        }
    };

    return (
        <Card title='User Profile'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                {user && <Avatar src={user.avatarUrl} size={64} />}
                <div style={{ marginLeft: '1rem' }}>
                    {user && (
                        <>
                            <h2>{user.username}</h2>
                            <p>Email: {user.email}</p>
                        </>
                    )}
                </div>
            </div>

            <h3>Posts:</h3>

            {userPosts?.map((post) => (
                <PostCard
                    isAuth={!!usersStore.authUser}
                    post={post}
                    key={post.id}
                    currentUser={currentUser}
                    comments={comments}
                />
            ))}

            <div style={{ marginTop: '1rem' }}>
                <Button
                    icon={<MessageOutlined />}
                    style={{ marginRight: '0.5rem' }}
                >
                    <Link to={`/messages/${id}`}>Написать сообщение</Link>
                </Button>

                {!friend && user && (
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddFriend}
                        disabled={isRequestSent}
                    >
                        {isRequestSent
                            ? 'Запрос отправлен'
                            : 'Добавить в друзья'}
                    </Button>
                )}
                {friend && (
                    <Button
                        danger
                        icon={<MinusOutlined />}
                        onClick={handleDeleteFriend}
                        disabled={isRequestSent}
                    >
                        Удалить из друзей
                    </Button>
                )}
            </div>
        </Card>
    );
});

export default UserProfile;
