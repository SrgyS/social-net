import { Card, List } from 'antd';

import { IMessage } from '../../../../types';

interface IMessagesListProps {
    conversation: IMessage[];
    senderId: string;
}

export const MessagesList = ({
    conversation,
    senderId,
}: IMessagesListProps) => {
    return (
        <List
            split={false}
            dataSource={conversation}
            renderItem={(message) => (
                <List.Item
                    style={{
                        maxWidth: '70%',
                        marginLeft: message.senderId === senderId ? 'auto' : '',
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
    );
};
