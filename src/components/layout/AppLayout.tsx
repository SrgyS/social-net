import { Layout, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import React from 'react';
import SidebarMenu from './menu/SidebarMenu';
import UsersList from './UsersList';
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/users';

const { Header, Content, Sider } = Layout;

const AppLayout: React.FC = observer(() => {
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    const isAuth = usersStore.isAuth;
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Link to='/' style={{ color: 'white' }}>
                    SoNET
                </Link>
            </Header>
            <Layout>
                <Sider width='25%' style={{ background: colorBgLayout }}>
                    <SidebarMenu isAuth={isAuth} />
                    {isAuth && <UsersList />}
                </Sider>
                <Content style={{ padding: '18px 40px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
});

export default AppLayout;
