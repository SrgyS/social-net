import { Avatar, Badge, Button, Card, Flex, List, Typography } from 'antd';
import { FC, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { getUsers } from '../../../utils/getUsers';
import usersStore from '../../../store/users';
import { observer } from 'mobx-react-lite';

export const Friends: FC = observer(() => {
    const [showFriendRequest, setShowFriendRequest] = useState(false);

    const { authUser, friendRequests } = usersStore;

    const friends = getUsers(authUser?.friends || []);
    const friendsRequest = getUsers(friendRequests || []);
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
            Друзья
            <Badge
                color='blue'
                count={friendRequests.length}
                offset={[-25, 25]}
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
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={
                                        <Typography>
                                            {user?.username}
                                        </Typography>
                                    }
                                />
                                <Button>Send Message</Button>
                            </List.Item>
                        );
                    }}
                />
            )}
        </Card>
    );
});
