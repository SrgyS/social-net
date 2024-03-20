import { Avatar, Button, Card } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';

import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import usersStore from '../../../store/users';

const UserProfile: FC = observer(() => {
    const { id } = useParams<{ id: string }>();
    const user = usersStore.allUsers.find((user) => user.id === id);
    // const authUser = usersStore.authUser;

    const isFriendRequestSent = user
        ? usersStore.isFriendRequestSent(user)
        : false;
    const isFriend = user ? usersStore.isFriend(user) : false;

    const handleAddFriend = () => {
        if (user && !isFriend && !isFriendRequestSent) {
            usersStore.addFriend(usersStore.authUser!.id, user.id);
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
                <Avatar
                    src={user?.avatarUrl}
                    size={64}
                    // icon={<UserOutlined />}
                />
                <div style={{ marginLeft: '1rem' }}>
                    <h2>{user?.username}</h2>
                    <p>Email: {user?.email}</p>
                </div>
            </div>

            <h3>Posts:</h3>

            {/* <ul>
        {user.posts && 
          user.posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
      </ul> */}

            <div style={{ marginTop: '1rem' }}>
                <Button
                    icon={<MessageOutlined />}
                    style={{ marginRight: '0.5rem' }}
                >
                    Написать сообщение
                </Button>

                {!isFriend && (
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddFriend}
                        disabled={isFriendRequestSent}
                    >
                        {isFriendRequestSent
                            ? 'Запрос отправлен'
                            : 'Добавить в друзья'}
                    </Button>
                )}
            </div>
        </Card>
    );
});

export default UserProfile;
