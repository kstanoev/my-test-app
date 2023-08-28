import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { greyHair } from '../common/constants';
import Fab from '@mui/material/Fab';
import { useContext } from 'react';
import { DateContext } from '../context/DateContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import dayjs from 'dayjs';
import CreateEventDialog from './CreateEventDialog';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const { calView, setCalView, displayDate, setDisplayDate } =
    useContext(DateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 4 }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem component="a" href="/login" onClick={handleMenuClose}>
        Log In
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, borderBottom: greyHair }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DEVent
          </Typography>
          <CreateEventDialog />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              setDisplayDate(displayDate.subtract(1, calView));
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              mr: '1vw',
            }}
          >
            <ArrowBackIosNewIcon sx={{ opacity: '0.7' }} />
          </IconButton>
          <IconButton
            onClick={() => {
              setDisplayDate(displayDate.add(1, calView));
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              mr: '2vw',
            }}
          >
            <ArrowForwardIosIcon sx={{ opacity: '0.7' }} />
          </IconButton>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: '10vw' }}
          >
            <Button
              sx={{
                color: calView === 'day' ? 'primary' : 'grey',
                border: '1px solid grey',
                '&:hover': {
                  border: '1px solid grey',
                  bgcolor: 'none',
                },
                bgcolor: calView === 'day' ? 'lightgrey' : 'white',
                width: '80px',
              }}
              onClick={() => setCalView('day')}
            >
              {calView === 'day' ? `${dayjs(displayDate).format('D')}` : 'day'}
            </Button>
            <Button
              sx={{
                color: calView === 'week' ? 'primary' : 'grey',
                border: '1px solid grey',
                '&:hover': {
                  border: '1px solid grey',
                  bgcolor: 'none',
                },
                bgcolor: calView === 'week' ? 'lightgrey' : 'white',
                width: '80px',
              }}
              onClick={() => setCalView('week')}
            >
              {calView === 'week' ? `${dayjs(displayDate).week()}` : 'week'}
            </Button>
            <Button
              sx={{
                color: calView === 'month' ? 'primary' : 'grey',
                border: '1px solid grey',
                width: '80px',
                '&:hover': {
                  border: '1px solid grey',
                  bgcolor: 'none',
                },
                bgcolor: calView === 'month' ? 'lightgrey' : 'white',
              }}
              onClick={() => setCalView('month')}
            >
              {calView === 'month'
                ? `${dayjs(displayDate).format('MMM')}`
                : 'month'}
            </Button>
            <Button
              sx={{
                color: calView === 'year' ? 'primary' : 'grey',
                border: '1px solid grey',
                width: '80px',
                '&:hover': {
                  border: '1px solid grey',
                  bgcolor: 'none',
                },
                bgcolor: calView === 'year' ? 'lightgrey' : 'white',
              }}
              onClick={() => setCalView('year')}
            >
              {calView === 'year'
                ? `${dayjs(displayDate).format('YYYY')}`
                : 'year'}
            </Button>
          </ButtonGroup>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: 'grey' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                ml: 1,
              }}
            >
              <Avatar {...stringAvatar('Kent Dodds')} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
