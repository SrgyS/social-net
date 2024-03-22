import { Avatar, Badge, Card, Menu } from 'antd';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../store/users';

const UsersList: FC = observer(() => {
    const { authUser } = usersStore;
    const users = usersStore.allUsers.filter(
        (user) => user.id !== authUser?.id
    );
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
                                <Avatar
                                    src={user.avatarUrl}
                                    size='small'
                                    style={{ backgroundColor: '#87d068' }}
                                    icon={<UserOutlined />}
                                />
                            </Badge>
                        ),
                    })),
                ]}
                style={{ borderInlineEnd: 'none' }}
            />
        </Card>
    );
});

export default UsersList;
