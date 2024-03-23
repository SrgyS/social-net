import { Button, Card, Flex } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
    MessageOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import AddPost from '../home/AddPost';
import { IUser } from '../../../types';
import PostCard from '../home/PostCard';
import { UserInfo } from './UserInfo';
import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const UserProfile = observer(() => {
    const { isFriendRequestSent, isFriend, authUser, allUsers } = usersStore;
    const { id } = useParams<{ id: string }>();
    const user = allUsers.find((user) => user.id === id);
    const authUserId = authUser?.id;
    let currentUser: IUser;
    if (authUser) {
        currentUser = authUser;
    }

    const isRequestSent = user ? isFriendRequestSent(user) : false;
    const friend = user ? isFriend(user) : false;
    const posts = [...postsStore.allPosts].reverse();
    const userPosts = user
        ? posts.filter((post) => post.author.id === user.id)
        : [];
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
    const isOwnProfile = authUserId === id;

    return (
        <>
            <Card style={{ backgroundColor: 'rgb(225, 241, 255, 0.9)' }}>
                <UserInfo user={user} authUser={authUser as IUser} />
                {!isOwnProfile && authUser && (
                    <Flex style={{ marginTop: '1rem' }}>
                        <Button
                            icon={<MessageOutlined />}
                            style={{ marginRight: '0.5rem' }}
                        >
                            <Link to={`/messages/${id}`}>
                                Написать сообщение
                            </Link>
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
                    </Flex>
                )}
            </Card>
            <div style={{ marginTop: '1rem' }}>
                {authUser && isOwnProfile && <AddPost />}
            </div>

            {userPosts?.map((post) => (
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

export default UserProfile;
