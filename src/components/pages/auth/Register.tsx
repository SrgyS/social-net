import { Button, Card, Form, Input, message } from 'antd';
import { IAuthFormValues, IUser } from '../../../types';

import usersStore from '../../../store/users';

interface IAuthProps {
    onSubmit: () => void;
}
const Register = ({ onSubmit }: IAuthProps) => {
    const onFinish = (values: IAuthFormValues) => {
        const existingUser = usersStore.allUsers.find(
            (user) => user.email === values.email
        );

        if (existingUser) {
            message.error('Пользователь с таким email уже существует');
        } else {
            const newUser: IUser = {
                id: new Date().toISOString(),
                username: values.name || '',
                email: values.email,
                password: values.password,
                isOnline: true,
                friends: [],
                posts: [],
                inFriendRequest:[],
                outFriendRequest: []
            };

            usersStore.addUser(newUser);
            usersStore.setAuthUser(newUser);
            onSubmit();
        }
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

                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Register;
