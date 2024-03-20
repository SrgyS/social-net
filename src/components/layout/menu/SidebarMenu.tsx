import { Button, Card, Flex, Menu, Modal } from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Auth from '../../pages/auth/Auth';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import { dataMenu } from './dataMenu';
import usersStore from '../../../store/users';

interface ISidebarMenuProps {
    isAuth: boolean;
}

const SidebarMenu: FC<ISidebarMenuProps> = ({ isAuth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

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

    return (
        <Card>
            {isAuth ? (
                <>
                    <Menu
                        mode='vertical'
                        items={dataMenu.map((item) => ({
                            key: item.path,
                            label: <Link to={item.path}>{item.title}</Link>,
                            icon: (
                                <item.icon
                                    style={{ fontSize: '16px', color: '#08c' }}
                                />
                            ),
                        }))}
                        style={{ borderInlineEnd: 'none' }}
                    />
                    <Button type='link' onClick={onLogout}>
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
                        <Button type='link' onClick={onLogout}>
                            Выйти
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
