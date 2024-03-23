import { Avatar, Card, Image, Space } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { IComment, IPost } from '../../../types';

import { Link } from 'react-router-dom';
import { formatPostDate } from '../../../utils/formatPostDate';

interface IPostCardContentProps {
    post: IPost;
    onDelete: (postId: string) => void;
    onEditClick: () => void;
    isAuthor: boolean;
    postComments: IComment[];
    isAuth: boolean;
}

export const PostCardContent = ({
    post,
    onDelete,
    isAuthor,
    isAuth,
    postComments,
    onEditClick,
}: IPostCardContentProps) => {
    return (
        <Card style={{ marginTop: 20 }}>
            <Link to={`/profile/${post.author.id}`}>
                <Card.Meta
                    avatar={
                        <Avatar
                            size='large'
                            style={{ backgroundColor: '#87d068' }}
                            icon={<UserOutlined />}
                            src={post.author?.avatarUrl}
                        />
                    }
                    title={
                        <>
                            {post.author.username}
                            <p
                                style={{
                                    fontSize: '12px',
                                    margin: 0,
                                    color: 'rgba(0, 0, 0, 0.45)',
                                }}
                            >
                                {formatPostDate(post.createdAt)}
                            </p>
                        </>
                    }
                />
            </Link>

            <div
                style={{
                    fontSize: '0.9rem',
                    color: 'black',
                    padding: '20px 0',
                }}
            >
                {post.content}
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
                        onClick={onEditClick}
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
                            onClick={() => onDelete(post.id)}
                        />
                    </div>
                )}
            </Space>
        </Card>
    );
};
