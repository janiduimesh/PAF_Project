import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Box, Avatar
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import UploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import Lottie from "lottie-react";
import cookingAnim from "../images/Anime3.json";


const drawerWidth = 240;

function NaviBar() {
    const [user, setUser] = useState([]);
  
  const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user"));

  const navItems = [
    { text: 'Daily Posts', icon: <ArticleIcon />, path: '/', color: '#F28B82' },
    { text: 'Recipes', icon: <RestaurantMenuIcon />, path: '/recipes', color: '#F28B82' },
    { text: 'Chefs', icon: <EmojiPeopleIcon />, path: '/chefs', color: '#F28B82' },
    { text: 'My Uploads', icon: <UploadIcon />, path: '/my-uploads', color: '#A7F0BA' }, 
    { text: 'My Profile', icon: <PersonIcon />, path: '/profile', color: '#AECBFA' }, 
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');  
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });
          setUser(response.data);  
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(145deg,rgb(255, 194, 194),rgb(255, 255, 154))',
          color: '#333',
          borderRight: '1px solid #ddd',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      {/* Top: Toolbar + Navigation */}
      <Box>
        <Toolbar
          sx={{
            background: 'linear-gradient(145deg, #f5f5f5, #e6e6e6)',
            borderBottom: '1px solid #ddd'
          }}
        />
             <Box sx={{ width: 120,height:100, mx:"auto", mb: 0,mt:1 }}>
             <Lottie animationData={cookingAnim} loop={true} />
            </Box>
        <List sx={{ mt: 4}}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
 
              <ListItem
                button
                component={Link}
                to={item.path}
                key={index}
                sx={{
                  mb: 2,
                  color: isActive ? '#fff' : '#333',
                  backgroundColor: isActive ? item.color : 'transparent',
                  boxShadow: isActive ? `0 0 10px ${item.color}` : 'none',
                  borderRadius: '8px',
                  mx: 1,
                  fontWeight: 'bold', 
                  '&:hover': {
                    backgroundColor: item.color,
                    boxShadow: `0 2px 5px ${item.color}88`,
                    color: '#fff',
                    fontWeight: 'bold', 
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#fff' : '#333' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom: User Info */}
      {user && (
      <Box sx={{ p: 2, background: 'linear-gradient(145deg,rgb(249, 233, 171),rgb(248, 245, 158))', textAlign: 'center' }}>
      <Avatar
        src={user.profileImageUrl || '/path/to/default/image.jpg'}  
        alt={user.name}
        sx={{ width: 56, height: 56, margin: '0 auto' }}
      />
      <Typography variant="body1" fontWeight="bold" mt={1}>
        {user.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
    </Box>
      )}
    </Drawer>
  );
}

export default NaviBar;
