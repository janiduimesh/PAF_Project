import React, { useEffect, useState } from 'react';
import {
  Drawer, List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Toolbar, Typography, Box, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 250;

function NaviBar2({ logUser }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("❗ No token found in localStorage");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (followedUserId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(`http://localhost:8080/users/follow`, {
        userId: logUser.id,
        followedUserId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Followed user:", followedUserId);
    } catch (err) {
      console.error("❌ Failed to follow user:", err);
    }
  };

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(145deg,rgb(255, 254, 183),rgb(255, 183, 183))',
          borderLeft: '1px solid #ddd',
          boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Toolbar
        sx={{
          background: 'linear-gradient(145deg,rgb(253, 253, 253),rgb(254, 254, 254))',
          borderBottom: '1px solid #ddd',
          minHeight: '64px',
          justifyContent: 'center',
        }}
      >
        
      </Toolbar>

      <Box sx={{ overflowY: 'auto', p: 2 ,mt:1}}>
      <Typography variant="h6" fontWeight="bold" color="#B40614">
          Active Users
        </Typography>
        <List>
          {users
            .filter(user => user?.id !== logUser?.id)
            .map((user, index) => (
              <ListItem
                key={user.id || index}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  px: 1.5,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap', // ✅ Allow wrapping
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {/* Avatar + Name */}
                <Box
                  onClick={() => navigate(`/profile/${user.id}`)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1,
                    cursor: 'pointer',
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <Avatar src={user.profileImageUrl} alt={user.name} />
                  <Typography
                    fontSize="0.95rem"
                    sx={{
                      whiteSpace: 'normal', 
                      wordBreak: 'break-word', 
                      flex: 1,
                    }}
                  >
                    {user.name}
                  </Typography>
                </Box>

                {/* Follow Button */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#0000FF',
                    color: '#fff',
                    textTransform: 'none',
                    minWidth: '70px',
                    ml: 6,
                    mt: { xs: 1, sm: 0 }, // stack below on small screens
                    alignSelf: 'flex-start', // align at top
                    '&:hover': {
                      backgroundColor: '#90CAF9',
                    },
                  }}
                  onClick={() => handleFollow(user.id)}
                >
                  Follow
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default NaviBar2;
