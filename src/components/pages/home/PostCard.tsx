import { Avatar, Badge, Card, Flex, Input } from 'antd';
import {
    CommentOutlined,
    DeleteOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { IComment, IPost, IUser } from '../../../types';
import React, { useState } from 'react';

import commentsStore from '../../../store/comments';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';

interface IPostProps {
    post: IPost;
    currentUser: IUser;
    comments?: IComment[];
    isAuth: boolean;
}

const PostCard: React.FC<IPostProps> = observer(
    ({ post, currentUser, isAuth, comments = [] }) => {
        const { author, content, createdAt, id } = post;

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
                    id: String(Date.now()),
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
            console.log('post id', id);
            postsStore.deletePost(id);
        };

        return (
            <>
                <Card
                    style={{ marginTop: 20 }}
                    actions={[
                        <Badge
                            count={hasComments ? postComments.length : 0}
                            overflowCount={99}
                            size='small'
                        >
                            <CommentOutlined
                                key='setting'
                                onClick={handleShowComments}
                                style={{
                                    color: hasComments
                                        ? '#1890ff'
                                        : 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        </Badge>,
                        <DeleteOutlined
                            key='delete'
                            onClick={handleDeletePost}
                        />,
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar src={author.avatarUrl} size='large' />}
                        title={author.username}
                        description={createdAt}
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
                                    <Input.TextArea
                                        rows={1}
                                        placeholder='Добавить комментарий...'
                                        value={newComment}
                                        onChange={(e) =>
                                            setNewComment(e.target.value)
                                        }
                                        onPressEnter={handleAddComment}
                                    />
                                    <SendOutlined
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleAddComment}
                                        disabled={
                                            !isAuth || newComment.trim() === ''
                                        }
                                    />
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
