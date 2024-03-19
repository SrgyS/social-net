import { Button, Input } from 'antd';
import { ChangeEvent, FC, useState } from 'react';

import { IPost } from '../../../types';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const { TextArea } = Input;

const AddPost: FC = observer(() => {
    const [postText, setPostText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const currentUser = usersStore.authUser;

    const handlePostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value);
    };
    const handleInputClick = () => {
        setIsExpanded(true);
    };

    const handleSubmit = () => {
        console.log('Текст поста:', postText);
        const newPost: IPost = {
            author: currentUser!,
            content: postText,
            createdAt: new Date().toISOString(),
            comments: [],
            id: Date.now().toString(),
        };
        postsStore.addPost(newPost);
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
});

export default AddPost;
