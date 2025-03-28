import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast from "react-hot-toast";
import NotificationBell from './NotificationBell';



const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(45deg,rgb(255, 203, 203),rgb(254, 244, 164))',
  boxShadow: 'none',
}));

export default function TopHeader() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMoreOpen = Boolean(mobileMoreAnchorEl);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function userLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully 👋");
        navigate('/login');
      }
    });
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMoreOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={userLogout}>
        <IconButton color="inherit">
          <LogoutRoundedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px', px: 2, width: '100%' }}>
          {/* Left side: App title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.5rem' },
                  fontWeight: 'bold',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #B40614, #FF4D4D)',
                  padding: { xs: '3px 10px', sm: '5px 15px' },
                  borderRadius: '16px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Let's Cook
              </Typography>
            )}
          </Box>
          <Box>
         <NotificationBell userId={JSON.parse(localStorage.getItem("user"))?.id} />
         </Box>

          {/* Right side: Logout Button */}
          <Box>
            <IconButton
              size="large"
              edge="end"
              onClick={userLogout}
              sx={{
                color: '#fff',
                backgroundColor: '#B40614',
                borderRadius: '50%',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#FF4D4D',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                },
              }}
            ><Typography>LogOut </Typography>
              <LogoutRoundedIcon />
            </IconButton>
            
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
