import { Button, Card, Form, Input, message } from 'antd';

import { ILoginFormValues } from '../../../types';
import usersStore from '../../../store/users';

interface IAuthProps {
    onSubmit: () => void;
}
const Login = ({ onSubmit }: IAuthProps) => {
    const onFinish = (values: ILoginFormValues) => {
        const foundUser = usersStore.allUsers.find(
            (user) =>
                user.email === values.email && user.password === values.password
        );
        if (foundUser) {
            usersStore.setAuthUser(foundUser);
            onSubmit();
        } else {
            message.error('Неверный email или пароль');
        }
    };

    return (
        <Card>
            <Form onFinish={onFinish} layout='vertical' preserve={false}>
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
                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
