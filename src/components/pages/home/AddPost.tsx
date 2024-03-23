import { Button, Card, Flex, Input, Upload } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

import { IPost } from '../../../types';
import { InboxOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import postsStore from '../../../store/posts';
import usersStore from '../../../store/users';

const { TextArea } = Input;

const AddPost: FC = observer(() => {
    const [postText, setPostText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const currentUser = usersStore.authUser;

    const handlePostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value);
    };
    const handleInputClick = () => {
        setIsExpanded(true);
    };

    const handleSubmit = () => {
        const imgUrls = fileList.map((file) =>
            file.originFileObj ? URL.createObjectURL(file.originFileObj) : ''
        ) as string[];

        const newPost: IPost = {
            author: currentUser!,
            content: postText,
            createdAt: new Date().toISOString(),
            id: new Date().toISOString(),
            imgUrls,
        };
        postsStore.addPost(newPost);
        setPostText('');
        setFileList([]);
        setIsExpanded(false);
    };
    const handleUploadChange = ({
        fileList: newFileList,
    }: UploadChangeParam) => {
        setFileList(newFileList);
    };

    return (
        <Card size='small' style={{ marginBottom: '2rem' }}>
            <TextArea
                rows={isExpanded ? 4 : 1}
                value={postText}
                onChange={handlePostTextChange}
                onClick={handleInputClick}
                placeholder='Что у вас нового?'
            />
            {isExpanded && (
                <div style={{ marginTop: '1rem' }}>
                    <Flex vertical align='start' gap={10}>
                        {' '}
                        <Upload
                            listType='picture'
                            maxCount={3}
                            onChange={(file) => handleUploadChange(file)}
                        >
                            <Button icon={<InboxOutlined />}>
                                Загрузить изображение
                            </Button>
                        </Upload>
                        <Button type='primary' onClick={handleSubmit}>
                            Отправить
                        </Button>
                    </Flex>
                </div>
            )}
        </Card>
    );
});

export default AddPost;
