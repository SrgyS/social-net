import { Avatar, Button, Card, Flex, Input, Space } from 'antd';

import { IUser } from '../../../types';
import { UserOutlined } from '@ant-design/icons';
import commentsStore from '../../../store/comments';
import { useState } from 'react';

interface IAddCommentProps {
    currentUser: IUser;
    postId: string;
    isAuth: boolean;
}
export const AddComment = ({
    currentUser,
    postId,
    isAuth,
}: IAddCommentProps) => {
    const { addComment } = commentsStore;

    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const newCommentData = {
                id: new Date().toISOString(),
                postId,
                author: currentUser,
                createdAt: new Date().toISOString(),
                content: newComment,
            };
            addComment(newCommentData);
            setNewComment('');
        }
    };

    return (
        <Card>
            <Card.Meta
                style={{ display: 'flex', width: '100%' }}
                avatar={
                    <Avatar
                        src={currentUser.avatarUrl}
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                    />
                }
                description={
                    <Flex gap={10}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input
                                placeholder='Добавить комментарий...'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onPressEnter={handleAddComment}
                            />
                            <Button
                                type='primary'
                                onClick={handleAddComment}
                                disabled={!isAuth || newComment.trim() === ''}
                            >
                                Отправить
                            </Button>
                        </Space.Compact>
                    </Flex>
                }
            />
        </Card>
    );
};
