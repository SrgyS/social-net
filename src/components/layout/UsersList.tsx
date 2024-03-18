import { Avatar, Badge, Card, Menu } from 'antd';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';
import { users } from '../../data/users';

const UsersList: FC = () => {
    return (
        <Card>
            <Menu
                mode='vertical'
                items={[
                    ...users.map((user) => ({
                        key: user.id,
                        label: (
                            <Link to={`/profile/${user.id}`}>
                                {user.username}
                            </Link>
                        ),
                        icon: (
                            <Badge
                                dot={user.isOnline}
                                style={{ backgroundColor: '#52c41a' }}
                            >
                                <Avatar src={user.avatarUrl} size='small' />
                            </Badge>
                        ),
                    })),
                    {
                        key: '/messages',
                        label: <Link to='/messages'>Сообщения</Link>,
                        icon: (
                            <MessageOutlined
                                style={{ fontSize: '16px', color: '#08c' }}
                            />
                        ),
                    },
                ]}
                style={{ borderInlineEnd: 'none' }}
            />
            {/* <List
                itemLayout='horizontal'
                dataSource={users}
                split={false}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Badge
                                    dot={user.isOnline}
                                    style={{ backgroundColor: '#52c41a' }}
                                >
                                    <Avatar src={user.avatarUrl} size='large' />
                                </Badge>
                            }
                            title={
                                <Link to={`/profile/${user.id}`}>
                                    {user.name}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
                footer={
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <MessageOutlined
                                    style={{ fontSize: '16px', color: '#08c' }}
                                />
                            }
                            title={<Link to='/messages'>Сообщения</Link>}
                        />
                    </List.Item>
                }
            /> */}
        </Card>
    );
};

export default UsersList;
