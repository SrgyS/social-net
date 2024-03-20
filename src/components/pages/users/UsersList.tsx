import { Avatar, Badge, Card, Menu } from 'antd';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../store/users';

const UsersList: FC = observer(() => {
    const users = usersStore.allUsers;
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
});

export default UsersList;
