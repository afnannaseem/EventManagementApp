import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import sendRequest from '../Api Call/apiCalls';
import Dashboard from '../Component/Dashboard';
import Event from '../Component/Event';
import Organizar from '../Component/Organizar';
import Vendor from '../Component/Vendor';
import { useBoard } from '../Hooks/useMainBoard';
import '../Style/bootstrap.css';
import MainListItems from './listItems';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'fixed',
  backgroundColor: "#313844",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    // mode: theme.palette.mode,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      marginTop: '64px',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      backgroundColor: "#313844",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        marginRight: '150px',
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const defaultTheme = createTheme();

export default function MainSuperAdmin() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { name } = useBoard();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', bgcolor: "#282E38" }}>
        <CssBaseline />
        <AppBar >
          <Toolbar
            sx={{
              pr: '150px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              }}
            >
              {
                open === false ? <MenuIcon /> : <ChevronLeftIcon />
              }
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {
                name === 'Dashboard' ? 'Dashboard' : null
              }
              {
                name === 'Events' ? 'Events' : null
              }
              {
                name === 'Vendors' ? 'Vendors' : null
              }
              {
                name === 'Sales' ? 'Sales' : null
              }
              {
                name === 'Organizer' ? 'Organizar' : null
              }
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}  >
          <Divider />
          <List component="nav">
            <MainListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            ml: 10,
            backgroundColor: "#282E38",
            flexGrow: 1,
            height: '107vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {
            name === 'Dashboard' ? <Dashboard /> : null
          }
          {
            name === 'Events' ? <Event /> : null
          }
          {
            name === 'Vendors' ? <Vendor /> : null
          }
          {
            name === 'Organizer' ? <Organizar /> : null
          }
        </Box>
      </Box>
    </ThemeProvider >
  );
}
