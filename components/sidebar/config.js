import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';

const sidebarConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Recipients',
    path: '/recipients',
    icon: <BadgeIcon />,
  },
];

export default sidebarConfig;
