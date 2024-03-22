import { Avatar, Button, Card, Flex, Image, Input, Space } from 'antd';
import {
    CommentOutlined,
    DeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { IComment, IPost, IUser } from '../../../types';
import React, { useState } from 'react';

import commentsStore from '../../../store/comments';
import { formatPostDate } from '../../../utils/formatPostDate';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

interface IPostProps {
    post: IPost;
    currentUser: IUser;
    comments?: IComment[];
    isAuth: boolean;
}

const PostCard: React.FC<IPostProps> = observer(
    ({ post, currentUser, isAuth, comments = [] }) => {
        const { author, content, createdAt, id } = post;
        const authUser = usersStore.authUser;
        const [showComments, setShowComments] = useState(false);
        const [newComment, setNewComment] = useState('');

        const postComments = comments?.filter(
            (comment) => comment.postId === id
        );

        const [hasComments, setHasComments] = useState(postComments.length > 0);

        const handleShowComments = () => {
            if (postComments.length > 0) {
                setShowComments(!showComments);
            }
        };

        const handleAddComment = () => {
            if (newComment.trim() !== '') {
                const newCommentData = {
                    id: new Date().toISOString(),
                    postId: post.id,
                    author: currentUser,
                    createdAt: new Date().toISOString(),
                    content: newComment,
                };
                commentsStore.addComment(newCommentData);
                setHasComments(true);
                setNewComment('');
            }
        };

        const handleDeletePost = () => {
            if (authUser && author.id === authUser.id) {
                postsStore.deletePost(id);
            }
        };

        const isAuthor = authUser && author.id === authUser.id;

        return (
            <>
                <Card
                    style={{ marginTop: 20 }}
                    actions={[
                        <div key='comment' onClick={handleShowComments}>
                            {hasComments ? postComments.length : ''}
                            <CommentOutlined
                                style={{
                                    marginLeft: 5,
                                    color: hasComments
                                        ? '#1890ff'
                                        : 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        </div>,
                        isAuthor && isAuth && (
                            <DeleteOutlined
                                key='delete'
                                onClick={handleDeletePost}
                            />
                        ),
                    ]}
                >
                    <Space>
                        {post.imgUrls &&
                            post.imgUrls.map((imgUrl) => (
                                <Image key={imgUrl} src={imgUrl} width={250} />
                            ))}
                    </Space>

                    <Card.Meta
                        avatar={
                            <Avatar
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                                src={author?.avatarUrl}
                            />
                        }
                        title={author.username}
                        description={formatPostDate(createdAt)}
                    />
                    <p style={{ fontSize: '1.5rem' }}>{content}</p>
                </Card>
                {showComments && (
                    <Card>
                        {postComments.map((comment) => (
                            <Card.Meta
                                key={comment.id}
                                avatar={
                                    <Avatar
                                        src={comment.author.avatarUrl}
                                        size='small'
                                    />
                                }
                                title={comment.author.username}
                                description={comment.content}
                            />
                        ))}
                    </Card>
                )}
                {isAuth ? (
                    <Card>
                        <Card.Meta
                            style={{ display: 'flex', width: '100%' }}
                            avatar={<Avatar src={currentUser.avatarUrl} />}
                            description={
                                <Flex gap={10}>
                                    <Space.Compact style={{ width: '100%' }}>
                                        <Input
                                            placeholder='Добавить комментарий...'
                                            value={newComment}
                                            onChange={(e) =>
                                                setNewComment(e.target.value)
                                            }
                                            onPressEnter={handleAddComment}
                                        />
                                        <Button
                                            type='primary'
                                            onClick={handleAddComment}
                                            disabled={
                                                !isAuth ||
                                                newComment.trim() === ''
                                            }
                                        >
                                            Отправить
                                        </Button>
                                    </Space.Compact>
                                </Flex>
                            }
                        />
                    </Card>
                ) : null}
            </>
        );
    }
);

export default PostCard;
