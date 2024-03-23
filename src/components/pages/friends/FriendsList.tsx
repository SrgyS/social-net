import { Avatar, Button, List } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';

import { IUser } from '../../../types';
import { Link } from 'react-router-dom';

interface IFriendsListProps {
    friends: (IUser | undefined)[];
}

export const FriendsList = ({ friends }: IFriendsListProps) => {
    return (
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
    );
};
