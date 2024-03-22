import * as Icons from '@ant-design/icons';

import { getProfilePath } from '../../../utils/getProfilePath';

export const dataMenu = (userId: string) => [
    {
        title: 'Моя страница',
        icon: Icons.HomeOutlined,
        path: userId ? getProfilePath(userId) : '/',
    },

    {
        title: 'Друзья',
        icon: Icons.UserOutlined,
        path: '/friends',
    },
    {
        title: 'Новости',
        icon: Icons.FileTextOutlined,
        path: '/',
    },
    {
        title: 'Сообщения',
        icon: Icons.MessageOutlined,
        path: '/messages',
    },
    {
        title: 'Пользователи',
        icon: Icons.TeamOutlined,
        path: '/users',
    },
];
