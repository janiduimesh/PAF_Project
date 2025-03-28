import React, { useEffect, useState } from 'react';
import {
  IconButton, Badge, Menu, MenuItem, Typography, ListItemText, Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';


const NotificationBell = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);


  const open = Boolean(anchorEl);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/${userId}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNotifications(res.data || []);
  
      // Check if there are unread notifications
      const unread = res.data?.some(n => !n.read);
      setHasUnread(unread);
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Update frontend state too
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setHasUnread(false);
    } catch (err) {
      console.error("❌ Failed to mark notifications as read", err);
    }
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    markAllAsRead(); // ✅ backend + frontend sync
  };
  

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const unreadCount = notifications.filter(n => !n.read).length;


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="black" onClick={handleClick} sx={{ml:130}}>
        <Badge badgeContent={hasUnread ? notifications.filter(n => !n.read).length : 0} color="error" >
             <NotificationsIcon  sx={{ fontSize: 40}} />
        </Badge>
        </IconButton>


      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography sx={{ px: 2, pt: 1, fontWeight: 'bold' }}>Notifications</Typography>
        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>No notifications</MenuItem>
        ) : (
          notifications.map((notif, index) => (
            <MenuItem key={index} dense>
              <ListItemText
                primary={notif.message}
                secondary={new Date(notif.createdAt).toLocaleString()}
                primaryTypographyProps={{
                  fontWeight: notif.read ? 'normal' : 'bold',
                }}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
