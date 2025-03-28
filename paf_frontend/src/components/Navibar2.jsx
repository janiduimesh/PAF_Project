import React, { useEffect, useState } from 'react';
import {
  Drawer, List, ListItem, Avatar, Typography, Box, Button, Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 250;

function NaviBar2({ logUser }) {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch all users and current user's followed list
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all users
        const userRes = await axios.get("http://localhost:8080/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(userRes.data);

        // Get logged-in user's followed users (optional backend route)
        const followedRes = await axios.get(`http://localhost:8080/users/${logUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFollowedUsers(followedRes.data.followingUsers || []);
      } catch (err) {
        console.error("❌ Error fetching users/follow data:", err);
      }
    };

    if (token && logUser?.id) {
      fetchData();
    }
  }, [logUser, token]);

  const handleFollow = async (followedUserId) => {
    try {
      await axios.post(`http://localhost:8080/users/${logUser.id}/follow/${followedUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFollowedUsers((prev) =>
        prev.includes(followedUserId)
          ? prev.filter((id) => id !== followedUserId) // unfollow
          : [...prev, followedUserId] // follow
      );
    } catch (err) {
      console.error("❌ Failed to follow/unfollow user:", err);
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
          background: 'linear-gradient(145deg,rgb(246, 244, 166),rgb(255, 194, 194))',
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
      <Box
          sx={{
            position: 'sticky',
            top: 0,
            pl:5,
            mt:1,
            backgroundColor: 'inherit',
            zIndex: 1,
            py: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#B40614">
          ✅ Active Users
          </Typography>
        </Box>
      <Box sx={{ overflowY: 'auto', p: 2, mt: 1 }}>

         <List>
          {users
            .filter((user) => user?.id !== logUser?.id)
            .map((user) => (
              <ListItem
                key={user.id}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  px: 1.5,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
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

                {/* Follow/Unfollow Button */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: followedUsers.includes(user.id) ? '#B40614' : '#0000FF',
                    color: '#fff',
                    textTransform: 'none',
                    minWidth: '80px',
                    ml: 6,
                    mt: { xs: 1, sm: 0 },
                    alignSelf: 'flex-start',
                    '&:hover': {
                      backgroundColor: followedUsers.includes(user.id)
                        ? '#FF867C'
                        : '#90CAF9',
                    },
                  }}
                  onClick={() => handleFollow(user.id)}
                >
                  {followedUsers.includes(user.id) ? 'Unfollow' : 'Follow'}
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default NaviBar2;
