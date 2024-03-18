import { Button, Card, Flex, Menu, Modal } from 'antd';
import { FC, useState } from 'react';

import Auth from '../../pages/auth/Auth';
import { Link } from 'react-router-dom';
import { dataMenu } from './dataMenu';
import usersStore from '../../../store/users';

interface ISidebarMenuProps {
    isAuth: boolean;
}

const SidebarMenu: FC<ISidebarMenuProps> = ({ isAuth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const showLoginModal = () => {
        setIsLogin(true);
        setIsModalOpen(true);
    };
    const showRegisterModal = () => {
        setIsLogin(false);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log('handleOk');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
    };

    const onLogout = () => {
        usersStore.clearAuthUser();
        console.log('onLogout');
        console.log(usersStore.authUser);
        console.log('store isAuth', usersStore.isAuth);
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
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null} // Удаляем кнопки из модального окна
                    >
                        <Auth isLogin={isLogin} onSubmit={handleSubmit} />
                    </Modal>
                </>
            )}
        </Card>
    );
};

export default SidebarMenu;
