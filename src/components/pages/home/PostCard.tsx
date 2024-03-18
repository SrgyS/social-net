import { Avatar, Card, Input } from 'antd';
import { IComment, IPost } from '../../../types';

import { CommentOutlined } from '@ant-design/icons';
import React from 'react';

interface IPostProps {
    post: IPost;
    currentUser: { username: string; avatarUrl: string };
    comments?: IComment[];
}

const PostCard: React.FC<IPostProps> = ({
    post,
    currentUser,
    comments = [],
}) => {
    const { author, content, createdAt } = post;

    const lastComment =
        comments.length > 0 ? comments[comments.length - 1] : null;

    return (
        <>
            <Card
                style={{ marginTop: 20 }}
                actions={[<CommentOutlined key='setting' />]}
            >
                <Card.Meta
                    avatar={<Avatar src={author.avatarUrl} size='large' />}
                    title={author.username}
                    description={createdAt}
                />
                <p style={{ fontSize: '1.5rem' }}>{content}</p>
            </Card>
            <Card>
                <Card.Meta
                    title={
                        lastComment ? (
                            <>
                                <Avatar
                                    src={lastComment.author.avatarUrl}
                                    size='small'
                                />
                                <span style={{ marginLeft: 8 }}>
                                    {lastComment.content}
                                </span>
                            </>
                        ) : (
                            'Нет комментариев'
                        )
                    }
                />
            </Card>
            <Card>
                <Card.Meta
                    style={{ display: 'flex', width: '100%' }}
                    avatar={<Avatar src={currentUser.avatarUrl} />}
                    description={
                        <Input.TextArea
                            rows={1}
                            placeholder='Добавить комментарий...'
                        />
                    }
                />
            </Card>
        </>
    );
};

export default PostCard;
