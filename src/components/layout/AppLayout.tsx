import { Avatar, Badge, Card, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;

const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

const AppLayout: React.FC = () => {
    const {
        token: { colorBgContainer, colorBgLayout, borderRadiusLG },
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
                }}
            >
                <div style={{ color: 'white' }}>LOGO</div>
                <Menu
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <div style={{ color: 'white' }}>person</div>
            </Header>
            <Layout>
                <Sider width='25%' style={{ background: colorBgLayout }}>
                    <Card>
                        <Link to='/profile'>
                            <Meta
                                avatar={
                                    <Badge dot>
                                        <Avatar
                                            shape='square'
                                            icon={<UserOutlined />}
                                        />
                                    </Badge>
                                }
                                title='Name Surname'
                                description='This is the description'
                            />
                        </Link>

                        <Meta
                            avatar={
                                <Badge dot>
                                    <Avatar
                                        shape='square'
                                        icon={<UserOutlined />}
                                    />
                                </Badge>
                            }
                            title='Name Surname'
                            description='This is the description'
                        />
                    </Card>
                </Sider>
                <Content style={{ padding: '48px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 380,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
