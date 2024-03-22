import { Avatar, Badge, Button, Card, Flex, List, Typography } from 'antd';
import { FC, useState } from 'react';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { getUsers } from '../../../utils/getUsers';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../store/users';

export const Friends: FC = observer(() => {
    const [showFriendRequest, setShowFriendRequest] = useState(false);

    const { authUser } = usersStore;
    const usersSentRequest = authUser?.inFriendRequest;
    const friends = getUsers(authUser?.friends || []);
    const friendsRequest = getUsers(usersSentRequest || []);
    const handleConfirmFriendRequest = (id: string) => {
        if (authUser) {
            usersStore.confirmFriendRequest(authUser.id, id);
            console.log(`Friend request's ${id})`);
        }
    };
    const handleCancelFriendRequest = (id: string) => {
        if (authUser) {
            usersStore.cancelFriendRequest(authUser.id, id);
        }
    };
    const Title = (
        <Flex justify='space-between' align='center'>
            {showFriendRequest ? 'Заявки в друзья' : 'Друзья'}
            <Badge
                color='blue'
                count={friendsRequest.length}
                offset={[-20, 25]}
            >
                <div style={{ padding: '20px' }}>
                    <Button
                        onClick={() => setShowFriendRequest(!showFriendRequest)}
                    >
                        {showFriendRequest ? 'Назад' : 'Заявки в друзья'}
                    </Button>
                </div>
            </Badge>
        </Flex>
    );

    return (
        <Card title={Title}>
            {showFriendRequest ? (
                <List
                    dataSource={friendsRequest}
                    renderItem={(user) => {
                        if (user) {
                            return (
                                <List.Item
                                    actions={[
                                        <Button
                                            key='add'
                                            type='primary'
                                            onClick={() =>
                                                handleConfirmFriendRequest(
                                                    user.id
                                                )
                                            }
                                        >
                                            Добавить
                                        </Button>,
                                        <Button
                                            key='reject'
                                            onClick={() =>
                                                handleCancelFriendRequest(
                                                    user.id
                                                )
                                            }
                                            danger
                                        >
                                            Отклонить
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar icon={<UserOutlined />} />
                                        }
                                        title={
                                            <Typography>
                                                {user?.username}
                                            </Typography>
                                        }
                                    />
                                </List.Item>
                            );
                        }
                    }}
                />
            ) : (
                <List
                    dataSource={friends}
                    renderItem={(user) => {
                        return (
                            <List.Item>
                                <Link to={`/profile/${user?.id}`}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#87d068',
                                                }}
                                                icon={<UserOutlined />}
                                                src={user?.avatarUrl}
                                            />
                                        }
                                        title={user?.username}
                                    />
                                </Link>

                                <Button
                                    icon={<MessageOutlined />}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    <Link to={`/messages/${user?.id}`}>
                                        Написать сообщение
                                    </Link>
                                </Button>
                            </List.Item>
                        );
                    }}
                />
            )}
        </Card>
    );
});
