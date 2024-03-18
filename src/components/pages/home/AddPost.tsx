import { Button, Input } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import { IPost, TypeSetState } from '../../../types';

import { users } from '../../../data/users';

const { TextArea } = Input;

interface IAddPost {
    setPosts: TypeSetState<IPost[]>;
}

const AddPost: FC<IAddPost> = ({ setPosts }) => {
    const [postText, setPostText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value);
    };
    const handleInputClick = () => {
        setIsExpanded(true);
    };

    const handleSubmit = () => {
        // Здесь вы можете добавить логику для отправки поста на сервер
        console.log('Текст поста:', postText);

        setPosts((prev) => [
            {
                author: users[0],
                content: postText,
                createdAt: 'new Date()',
                comments: [],
                id: '',
            },
            ...prev,
        ]);
        setPostText('');
        setIsExpanded(false);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <TextArea
                rows={isExpanded ? 4 : 1}
                value={postText}
                onChange={handlePostTextChange}
                onClick={handleInputClick}
                placeholder='Что у вас нового?'
            />
            {isExpanded && (
                <div style={{ marginTop: 8 }}>
                    <Button
                        type='primary'
                        style={{ marginLeft: 8, marginTop: 8 }}
                        onClick={handleSubmit}
                    >
                        Отправить
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AddPost;
