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
                title={
                    <Flex gap={10} align='start'>
                        <Avatar
                            size='large'
                            style={{ backgroundColor: '#87d068' }}
                            icon={<UserOutlined />}
                            src={comment.author.avatarUrl}
                        />
                        <Flex vertical align='start'>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'darkGreen',
                                    margin: '0 0 6px 0',
                                }}
                            >
                                {comment.author.username}
                            </p>

                            <p
                                style={{
                                    fontSize: '14px',
                                    margin: 0,
                                    fontWeight: 'normal',
                                }}
                            >
                                {comment.content}
                            </p>
                            <p
                                style={{
                                    fontSize: '10px',
                                    margin: 0,
                                    color: 'rgba(0, 0, 0, 0.45)',
                                }}
                            >
                                {formatPostDate(comment.createdAt)}
                            </p>
                        </Flex>
                    </Flex>
                }
            />
        </Link>
    );
};

export default CommentCard;
