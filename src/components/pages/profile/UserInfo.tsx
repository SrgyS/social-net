import { Avatar, Flex, Typography } from 'antd';

import { IUser } from '../../../types';
import { UserOutlined } from '@ant-design/icons';

interface IUserInfoProps {
    user?: IUser;
    authUser?: IUser;
}
export const UserInfo = ({ user, authUser }: IUserInfoProps) => {
    const { Text } = Typography;

    return (
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
    );
};
