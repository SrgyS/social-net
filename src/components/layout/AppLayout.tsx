import { Button, Layout, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import SidebarMenu from './menu/SidebarMenu';
import { clearLocalStorage } from '../../utils/clearLocalStorage';
import { observer } from 'mobx-react-lite';
import usersStore from '../../store/users';

const { Header, Content, Sider } = Layout;

const AppLayout = observer(() => {
    const {
        token: { colorBgLayout },
    } = theme.useToken();

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
                    justifyContent: 'space-between',
                }}
            >
                <Link to='/' style={{ color: 'white' }}>
                    SoNET
                </Link>
                <Button onClick={clearLocalStorage} ghost>
                    Очистить local storage
                </Button>
            </Header>
            <Layout>
                <Sider width='25%' style={{ background: colorBgLayout }}>
                    <SidebarMenu isAuth={!!usersStore.authUser} />
                </Sider>
                <Content style={{ padding: '18px 40px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
});

export default AppLayout;
