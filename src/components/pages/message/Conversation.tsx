import { Avatar, Button, Card, Flex, Input, List, Space } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { IMessage } from '../../../types';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import usersStore from '../../../store/users';

const Conversation = observer(() => {
    const { authUser, getConversation, allUsers } = usersStore;
    const senderId = authUser?.id ?? '';

    const receiverId = useParams<{ id: string }>().id ?? '';
    const receiver = allUsers.find((user) => user.id === receiverId);
    const [newMessage, setNewMessage] = useState('');
    const conversation = getConversation(senderId, receiverId);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: IMessage = {
                id: new Date().toISOString(),
                senderId,
                receiverId,
                text: newMessage,
                timestamp: Date.now(),
            };
            usersStore.sendMessage(message);
            setNewMessage('');
        }
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Card size='small'>
                <Flex justify='space-between'>
                    <Link to={`/profile/${receiverId}`}>
                        {' '}
                        <Card.Meta
                            avatar={
                                <Avatar
                                    src={receiver?.avatarUrl}
                                    size='large'
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    icon={<UserOutlined />}
                                />
                            }
                            title={receiver?.username}
                        />
                    </Link>

                    <Button onClick={handleGoBack}>Назад</Button>
                </Flex>
            </Card>

            <List
                split={false}
                dataSource={conversation}
                renderItem={(message) => (
                    <List.Item
                        style={{
                            maxWidth: '70%',

                            marginLeft:
                                message.senderId === senderId ? 'auto' : '',
                        }}
                    >
                        <List.Item.Meta
                            description={
                                <div
                                    style={{
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <Card
                                        style={{
                                            width: '100%',
                                            backgroundColor:
                                                message.senderId === senderId
                                                    ? '#dedfe0'
                                                    : '',
                                        }}
                                    >
                                        {message.text}
                                    </Card>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />

            <Space.Compact style={{ width: '100%' }}>
                <Input
                    placeholder='Сообщение'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                />
                <Button onClick={handleSendMessage} type='primary'>
                    Отправить
                </Button>
            </Space.Compact>
        </>
    );
});

export default Conversation;
