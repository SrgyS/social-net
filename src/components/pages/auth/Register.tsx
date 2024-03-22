import { Button, Card, Flex, Form, Input, Upload, message } from 'antd';
import { IAuthFormValues, IUser } from '../../../types';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import usersStore from '../../../store/users';

interface IAuthProps {
    onSubmit: () => void;
}
const Register = ({ onSubmit }: IAuthProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = (values: IAuthFormValues) => {
        const existingUser = usersStore.allUsers.find(
            (user) => user.email === values.email
        );

        if (existingUser) {
            message.error('Пользователь с таким email уже существует');
        } else {
            const avatarUrl = fileList.map((file) =>
                file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : ''
            ) as string[];
            const newUser: IUser = {
                id: new Date().toISOString(),
                username: values.name || '',
                email: values.email,
                password: values.password,
                isOnline: true,
                friends: [],
                posts: [],
                inFriendRequest: [],
                outFriendRequest: [],
                unreadMessages: [],
                avatarUrl: avatarUrl[0] || '',
            };
            usersStore.addUser(newUser);
            usersStore.setAuthUser(newUser);
            onSubmit();
        }
    };

    const handleUploadChange = ({
        fileList: newFileList,
    }: UploadChangeParam) => {
        setFileList(newFileList);
    };

    return (
        <Card>
            <Form onFinish={onFinish} layout='vertical' preserve={false}>
                <Form.Item
                    name='name'
                    label='Имя'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваше имя',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='email'
                    label='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш email',
                        },
                        {
                            type: 'email',
                            message: 'Пожалуйста, введите корректный email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='password'
                    label='Пароль'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name='confirmPassword'
                    label='Подтвердите пароль'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, подтвердите пароль',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Пароли не совпадают')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Flex vertical gap={20}>
                    {' '}
                    <Upload
                        listType='picture'
                        maxCount={1}
                        onChange={(file) => handleUploadChange(file)}
                    >
                        <Button icon={<InboxOutlined />}>
                            Загрузить аватар
                        </Button>
                    </Upload>
                    <Button type='primary' htmlType='submit' block>
                        Зарегистрироваться
                    </Button>
                </Flex>

                <Form.Item></Form.Item>
            </Form>
        </Card>
    );
};

export default Register;
