import { Avatar, Badge, List } from 'antd';

import { FC } from 'react';
import { IUser } from '../../../types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../store/users';

const Messages: FC = observer(() => {
    const { authUser, allUsers, getConversation, getUnreadMessagesCount } =
        usersStore;

    const conversationUsers: IUser[] = authUser
        ? allUsers.filter((user) => {
              const conversation = getConversation(authUser.id, user.id);
              return conversation.length > 0;
          })
        : [];

    return (
        <List
            itemLayout='horizontal'
            dataSource={conversationUsers}
            renderItem={(user) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Badge
                                count={getUnreadMessagesCount(user.id)}
                                color='lime'
                            >
                                <Avatar src={user.avatarUrl} />
                            </Badge>
                        }
                        title={
                            <Link
                                to={`/messages/${user.id}`}
                                onClick={() =>
                                    usersStore.markMessagesAsRead(user.id)
                                }
                            >
                                {user.username}
                            </Link>
                        }
                        description={`${user.email}`}
                    />
                </List.Item>
            )}
        />
    );
});

export default Messages;
