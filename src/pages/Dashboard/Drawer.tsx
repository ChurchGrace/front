import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ListItemTextStyled } from './DashboardStyled';
import { drawerWidth, nestedMainLinks, nestedContactLinks, nestedFooterLinks, links } from './drawerConfig';

const DrawerComponent = ({ window }: { window?: () => Window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contact, setOpenContact] = useState(true);
  const [main, setOpenMain] = useState(true);
  const [footer, setOpenFooter] = useState(true);
  const navigate = useNavigate();
  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL!}dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') as string}`,
        },
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const createButton = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    expand: boolean,
    nestedLinks: { name: string; url: string }[],
    text: string,
  ) => {
    return (
      <>
        <ListItemButton onClick={() => setOpen((prev) => !prev)}>
          <ListItemText sx={{ color: '#ffff' }} primary={text} />
          {expand ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expand} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {nestedLinks.map((item) => (
              <NavLink key={item.name} to={item.url}>
                {({ isActive }) => (
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemTextStyled
                        isactive={isActive ? '#c0ebb9 !important' : '#ffff !important'}
                        primary={item.name}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </NavLink>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const createLinks = () => {
    return links.map((item) => (
      <NavLink key={item.name} to={item.url} end>
        {({ isActive }) => (
          <ListItem disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemTextStyled isactive={isActive ? '#c0ebb9 !important' : '#ffff !important'} primary={item.name} />
            </ListItemButton>
          </ListItem>
        )}
      </NavLink>
    ));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {createLinks()}
        {createButton(setOpenMain, main, nestedMainLinks, 'Главная')}
        {createButton(setOpenContact, contact, nestedContactLinks, 'Контакты')}
        {createButton(setOpenFooter, footer, nestedFooterLinks, 'Подвал')}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: '#212121',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Админ панель
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DrawerComponent;
