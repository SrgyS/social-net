import { Avatar, Button, Card, Flex, Image, Input, Space } from 'antd';
import {
    CommentOutlined,
    DeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { IComment, IPost, IUser } from '../../../types';
import React, { useState } from 'react';

import CommentCard from './CommentCard';
import { Link } from 'react-router-dom';
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
            console.log('delete');
            if (authUser && author.id === authUser.id) {
                postsStore.deletePost(id);
                console.log('delete2');
            }
        };

        const isAuthor = authUser && author.id === authUser.id;

        return (
            <>
                <Card style={{ marginTop: 20 }}>
                    <Link to={`/profile/${post.author.id}`}>
                        <Card.Meta
                            avatar={
                                <Avatar
                                    size='large'
                                    style={{ backgroundColor: '#87d068' }}
                                    icon={<UserOutlined />}
                                    src={author?.avatarUrl}
                                />
                            }
                            title={
                                <>
                                    {author.username}
                                    <p
                                        style={{
                                            fontSize: '12px',
                                            margin: 0,
                                            color: 'rgba(0, 0, 0, 0.45)',
                                        }}
                                    >
                                        {formatPostDate(createdAt)}
                                    </p>
                                </>
                            }
                        />
                    </Link>

                    <div
                        style={{
                            fontSize: '1rem',
                            color: 'black',
                            padding: '20px 0',
                        }}
                    >
                        {content}
                    </div>
                    <div>
                        {post.imgUrls &&
                            post.imgUrls.map((imgUrl) => (
                                <Image key={imgUrl} src={imgUrl} width={250} />
                            ))}
                    </div>

                    <Space
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: 'rgb(242, 242, 242)',
                                padding: '6px',
                                borderRadius: '5px',
                                color: '#1890ff',
                            }}
                        >
                            {hasComments ? postComments.length : ''}
                            <CommentOutlined
                                onClick={handleShowComments}
                                style={{
                                    marginLeft: 5,
                                    color: hasComments
                                        ? '#1890ff'
                                        : 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        </div>
                        {isAuthor && isAuth && (
                            <div
                                style={{
                                    backgroundColor: 'rgb(242, 242, 242)',
                                    padding: '6px',
                                    borderRadius: '5px',
                                }}
                            >
                                <DeleteOutlined
                                    key='delete'
                                    onClick={handleDeletePost}
                                />
                            </div>
                        )}
                    </Space>
                </Card>
                {showComments && (
                    <Card>
                        {postComments.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                    </Card>
                )}
                {isAuth ? (
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
