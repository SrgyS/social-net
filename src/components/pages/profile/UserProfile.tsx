import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
    MessageOutlined,
    MinusOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';

import AddPost from '../home/AddPost';
import { IUser } from '../../../types';
import PostCard from '../home/PostCard';
import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const UserProfile = observer(() => {
    const { Text } = Typography;
    const { isFriendRequestSent, isFriend, authUser } = usersStore;
    const { id } = useParams<{ id: string }>();
    const user = usersStore.allUsers.find((user) => user.id === id);
    const authUserId = authUser?.id;
    let currentUser: IUser;
    if (usersStore.authUser) {
        currentUser = usersStore.authUser;
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
            {authUser && <AddPost />}
            <Card>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    {user && (
                        <Avatar
                            src={user.avatarUrl}
                            size={64}
                            style={{
                                backgroundColor: '#87d068',
                                minWidth: '64px',
                            }}
                            icon={<UserOutlined />}
                        />
                    )}
                    <Flex
                        style={{ marginLeft: '1rem', width: '100%' }}
                        justify='space-between'
                    >
                        {user && (
                            <Flex vertical>
                                <Text strong>{user.username}</Text>
                                <Text>Email: {user.email}</Text>
                            </Flex>
                        )}
                        {authUser && (
                            <Flex align='center' gap={10}>
                                <UserOutlined />
                                <Text strong>{authUser?.friends.length}</Text>
                                <Text>друзей</Text>
                            </Flex>
                        )}
                    </Flex>
                </div>
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
                {userPosts?.map((post) => (
                    <PostCard
                        isAuth={!!usersStore.authUser}
                        post={post}
                        key={post.id}
                        currentUser={currentUser}
                        comments={comments}
                    />
                ))}
            </Card>
        </>
    );
});

export default UserProfile;
