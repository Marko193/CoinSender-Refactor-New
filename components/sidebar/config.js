// const getIcon = (name) => <img src={name} alt="" />;

import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';

const sidebarConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: <BadgeIcon />,
  },
  // {
  //   title: 'Expenses',
  //   icon: <AccountBalanceIcon />,
  //   children: [
  //     {
  //       title: 'Make Payment ',
  //       path: BANKING,
  //     },
  //     {
  //       title: 'Receipents',
  //       path: EMPLOYEES,
  //     },
  //     {
  //       title: 'My transactions (in progress)',
  //       path: TRANSACTIONS,
  //     },
  //   ],
  // },

  // {
  //   title: 'login',
  //   path: SIGN_IN,
  //   icon: getIcon('eva:lock-fill'),
  // },

  // {
  //   title: 'register',
  //   path: SIGN_UP,
  //   icon: getIcon('eva:person-add-fill'),
  // },
];

export default sidebarConfig;
