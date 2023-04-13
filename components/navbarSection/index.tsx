import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import Iconify from '@/components/iconify';
import { useRouter } from 'next/router';

const ListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,

    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  }),
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function NavItem({ item, active }: any) {
  // console.log('active', active);
  const theme = useTheme();
  // const isActiveRoot = active(item.path);
  const { title, path, icon, info, children }: any = item;
  // const [open, setOpen] = useState(isActiveRoot);
  // const [childOpen, setChildOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    console.log('clicked');
    // setOpen((prev: any) => !prev);
  };

  const handleSubOpen = () => {
    // setChildOpen((prev: any) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          to={item}
          // sx={{
          //   ...(isActiveRoot && activeRootStyle),
          // }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            // icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            icon={'eva:arrow-ios-downward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse
          // in={open}
          timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: any) => {
              const { title, path, children } = item;
              const isActiveSub: any = active(path);

              return (
                <ListItemStyle
                  key={title}
                  // component={RouterLink}
                  to={item}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                    pl: 9,
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      // component={RouterLink}
      to={path}
      // sx={{
      //   ...(isActiveRoot && activeRootStyle),
      // }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, ...other }: any) {
  const router = useRouter();

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item: any) => (
          <NavItem key={item.title} item={item}
                   // active={match}
          />
        ))}
      </List>
    </Box>
  );
}
