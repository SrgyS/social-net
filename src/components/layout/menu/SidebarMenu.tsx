import {
    Avatar,
    Badge,
    Button,
    Card,
    Flex,
    Menu,
    Modal,
    Typography,
} from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import { UserOutlined } from '@ant-design/icons';
import { dataMenu } from './dataMenu';
import usersStore from '../../../store/users';

interface ISidebarMenuProps {
    isAuth: boolean;
}
const SidebarMenu: FC<ISidebarMenuProps> = ({ isAuth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const { authUser } = usersStore;
    const showLoginModal = () => {
        setIsLogin(true);
        setIsModalOpen(true);
    };
    const showRegisterModal = () => {
        setIsLogin(false);
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
    };

    const onLogout = () => {
        usersStore.clearAuthUser();
        navigate('/');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const menuItems = authUser?.id ? dataMenu(authUser.id) : [];

    return (
        <Card>
            {isAuth ? (
                <>
                    {' '}
                    <Flex
                        justify='start'
                        style={{ marginLeft: '10px', marginBottom: '20px' }}
                    >
                        <Avatar
                            style={{ backgroundColor: '#87d068' }}
                            icon={<UserOutlined />}
                            src={usersStore.authUser?.avatarUrl}
                        />
                        <div style={{ marginLeft: '8px' }}>
                            <Typography.Text>
                                {usersStore.authUser?.username}
                            </Typography.Text>
                        </div>
                    </Flex>
                    <Menu
                        mode='vertical'
                        items={menuItems.map((item) => ({
                            key: item.path,
                            label: (
                                <Badge
                                    color='blue'
                                    style={{
                                        margin: '6px -15px',
                                        cursor: 'pointer',
                                    }}
                                    count={
                                        item.path === '/messages'
                                            ? usersStore.authUser
                                                  ?.unreadMessages.length || 0
                                            : 0
                                    }
                                    overflowCount={99}
                                >
                                    <Link to={item.path}>{item.title}</Link>
                                </Badge>
                            ),
                            icon: (
                                <item.icon
                                    style={{ fontSize: '16px', color: '#08c' }}
                                />
                            ),
                        }))}
                        style={{ borderInlineEnd: 'none' }}
                    />
                    <Button
                        type='primary'
                        ghost
                        onClick={onLogout}
                        style={{ margin: '20px 20px' }}
                    >
                        Выйти
                    </Button>
                </>
            ) : (
                <>
                    <Flex vertical gap='middle'>
                        <Button type='primary' onClick={showLoginModal}>
                            Войти
                        </Button>
                        <Button onClick={showRegisterModal} type='default'>
                            Зарегистрироваться
                        </Button>
                    </Flex>
                    <Modal
                        open={isModalOpen}
                        title={isLogin ? 'Авторизация' : 'Регистрация'}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        {isLogin ? (
                            <Login onSubmit={handleSubmit} />
                        ) : (
                            <Register onSubmit={handleSubmit} />
                        )}
                    </Modal>
                </>
            )}
        </Card>
    );
};

export default SidebarMenu;
