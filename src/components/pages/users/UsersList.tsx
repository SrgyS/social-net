import { Avatar, Badge, Card, Menu } from 'antd';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';
import { users } from '../../../data/users';

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
                ]}
                style={{ borderInlineEnd: 'none' }}
            />
        </Card>
    );
};

export default UsersList;
