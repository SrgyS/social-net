import { Avatar, Button, Card, Flex, Image, Input, Space } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { IComment, IPost, IUser } from '../../../types';
import React, { useState } from 'react';

import { AddComment } from './AddComment';
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

        const postComments = comments?.filter(
            (comment) => comment.postId === id
        );

        const handleShowComments = () => {
            if (postComments.length > 0) {
                setShowComments(!showComments);
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
                                padding: '6px 10px 6px 5px',
                                borderRadius: '5px',
                                color: '#1890ff',
                            }}
                        >
                            {postComments.length > 0 && postComments.length}
                            <EditOutlined
                                onClick={handleShowComments}
                                style={{
                                    marginLeft: 5,
                                    color:
                                        postComments.length > 0
                                            ? '#1890ff'
                                            : 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        </div>
                        {isAuthor && isAuth && (
                            <div
                                style={{
                                    backgroundColor: 'rgb(242, 242, 242)',
                                    padding: '6px 10px',
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
                {isAuth && (
                    <AddComment
                        currentUser={currentUser}
                        postId={post.id}
                        isAuth={isAuth}
                    />
                )}
            </>
        );
    }
);

export default PostCard;
