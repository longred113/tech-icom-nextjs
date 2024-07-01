import { Icon } from '@iconify/react';
import { SideNavItem } from './types';
import { CircleUserRound, Headphones, Keyboard, Laptop, Monitor, Mouse, PcCase } from 'lucide-react';

export const SIDENAV_ITEMS_LOGGED_IN: SideNavItem[] = [
    {
        title: "Tech Icom",
        path: "/",
        icon: <Icon icon="lucide:home" width="24" height="24" />
    },
    {
        title: 'Tài khoản',
        path: '/account',
        icon: <CircleUserRound />,
        submenu: true,
        subMenuItems: [
            { title: 'Profile', path: '/account' },
            { title: 'Đăng xuất', path: '/logout' },
        ],
    },
    {
        title: 'Laptop',
        path: '/products',
        icon: <Laptop />,
        submenu: true,
        subMenuItems: [
            { title: 'All', path: '/products' },
            { title: 'Web Design', path: '/products' },
            { title: 'Graphic Design', path: '/projects/graphic-design' },
        ],
    },

    {
        title: 'PC',
        path: '/#',
        icon: <PcCase />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Màn hình',
        path: '/#',
        icon: <Monitor />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Bàn phím',
        path: '/#',
        icon: <Keyboard />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Chuột',
        path: '/#',
        icon: <Mouse />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Tai nghe',
        path: '/#',
        icon: <Headphones />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    }
];

export const SIDENAV_ITEMS_LOGGED_OUT: SideNavItem[] = [
    {
        title: "Tech Icom",
        path: "/",
        icon: <Icon icon="lucide:home" width="24" height="24" />
    },
    {
        title: 'Tài khoản',
        path: '/account',
        icon: <CircleUserRound />,
        submenu: true,
        subMenuItems: [
            { title: 'Đăng nhập', path: '/login' },
            { title: 'Đăng ký', path: '/register' },
        ],
    },
    {
        title: 'Laptop',
        path: '/products',
        icon: <Laptop />,
        submenu: true,
        subMenuItems: [
            { title: 'All', path: '/products' },
            { title: 'Web Design', path: '/products' },
            { title: 'Graphic Design', path: '/projects/graphic-design' },
        ],
    },

    {
        title: 'PC',
        path: '/#',
        icon: <PcCase />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Màn hình',
        path: '/#',
        icon: <Monitor />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Bàn phím',
        path: '/#',
        icon: <Keyboard />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Chuột',
        path: '/#',
        icon: <Mouse />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    },
    {
        title: 'Tai nghe',
        path: '/#',
        icon: <Headphones />,
        submenu: true,
        subMenuItems: [
            { title: 'About Us', path: '/about' },
            { title: 'Team', path: '/about/team' },
            { title: 'Careers', path: '/about/careers' },
        ],
    }
];

