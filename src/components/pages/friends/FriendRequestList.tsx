import { Avatar, Button, List, Typography } from 'antd';

import { IUser } from '../../../types';
import { UserOutlined } from '@ant-design/icons';

interface IFriendRequestListProps {
    friendRequests: (IUser | undefined)[];
    onConfirmRequest: (userId: string) => void;
    onCancelRequest: (userId: string) => void;
}
export const FriendRequestList = ({
    friendRequests,
    onCancelRequest,
    onConfirmRequest,
}: IFriendRequestListProps) => {
    const { Text } = Typography;

    return (
        <List
            dataSource={friendRequests}
            renderItem={(user) => {
                if (user) {
                    return (
                        <List.Item
                            actions={[
                                <Button
                                    key='add'
                                    type='primary'
                                    onClick={() => onConfirmRequest(user.id)}
                                >
                                    Добавить
                                </Button>,
                                <Button
                                    key='reject'
                                    onClick={() => onCancelRequest(user.id)}
                                    danger
                                >
                                    Отклонить
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={<Text>{user?.username}</Text>}
                            />
                        </List.Item>
                    );
                }
            }}
        />
    );
};
