import { Avatar, Card, Flex } from 'antd';

import { IComment } from '../../../types';
import { Link } from 'react-router-dom';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { formatPostDate } from '../../../utils/formatPostDate';

interface ICommentCardProps {
    comment: IComment;
}

const CommentCard: React.FC<ICommentCardProps> = ({ comment }) => {
    return (
        <Link to={`/profile/${comment.author.id}`}>
            <Card.Meta
                style={{ marginBottom: '24px' }}
                key={comment.id}
                avatar={
                    <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                        src={comment.author.avatarUrl}
                    />
                }
                title={
                    <Flex vertical gap={1}>
                        {comment.author.username}
                        <p
                            style={{
                                fontSize: '16px',
                                margin: 0,
                                fontWeight: 'normal',
                            }}
                        >
                            {comment.content}
                        </p>
                        <p
                            style={{
                                fontSize: '12px',
                                margin: 0,
                                color: 'rgba(0, 0, 0, 0.45)',
                            }}
                        >
                            {formatPostDate(comment.createdAt)}
                        </p>
                    </Flex>
                }
            />
        </Link>
    );
};

export default CommentCard;
