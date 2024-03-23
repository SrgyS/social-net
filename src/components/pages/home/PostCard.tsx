import { IComment, IPost, IUser } from '../../../types';
import React, { useState } from 'react';

import { AddComment } from './AddComment';
import { Card } from 'antd';
import CommentCard from './CommentCard';
import { PostCardContent } from './PostCardContent';
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
        const { author, id } = post;
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

        const handleDeletePost = (postId: string) => {
            if (authUser && author.id === authUser.id) {
                postsStore.deletePost(postId);
            }
        };

        const isAuthor = (authUser && author.id === authUser.id) || false;

        return (
            <>
                <PostCardContent
                    post={post}
                    onDelete={handleDeletePost}
                    isAuthor={isAuthor}
                    isAuth={isAuth}
                    postComments={postComments}
                    onEditClick={handleShowComments}
                />
                {showComments && (
                    <Card size='small'>
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
