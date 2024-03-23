import { Badge, Button, Card, Flex } from 'antd';
import { FC, useState } from 'react';

import { FriendRequestList } from './FriendRequestList';
import { FriendsList } from './FriendsList';
import { getUsers } from '../../../utils/getUsers';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../store/users';

export const Friends: FC = observer(() => {
    const [showFriendRequest, setShowFriendRequest] = useState(false);

    const { authUser } = usersStore;
    const usersSentRequest = authUser?.inFriendRequest;
    const friends = getUsers(authUser?.friends || []);
    const friendsRequests = getUsers(usersSentRequest || []);
    const handleConfirmFriendRequest = (id: string) => {
        if (authUser) {
            usersStore.confirmFriendRequest(authUser.id, id);
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
                count={friendsRequests.length}
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
                <FriendRequestList
                    friendRequests={friendsRequests}
                    onConfirmRequest={handleConfirmFriendRequest}
                    onCancelRequest={handleCancelFriendRequest}
                />
            ) : (
                <FriendsList friends={friends} />
            )}
        </Card>
    );
});
