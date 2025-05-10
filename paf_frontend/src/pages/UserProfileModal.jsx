import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Avatar, Typography, Button, Box, Divider
  } from "@mui/material";
  
  const UserProfileModal = ({ open, onClose, user, isFollowing, onFollowToggle }) => {
    if (!user) return null;
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: 'rgb(255, 235, 205)',
          }}
        >
          {user.name}
        </DialogTitle>
  
        <DialogContent sx={{ backgroundColor: 'rgb(255, 249, 230)' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Avatar
              src={user.profileImageUrl}
              alt={user.name}
              sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }}
            />
  
            <Typography variant="body1" fontWeight="medium" color="text.primary">
              {user.email}
            </Typography>
  
            <Divider sx={{ my: 2 }} />
  
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Followers
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {user.followersCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Following
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {user.followingCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
  
        <DialogActions sx={{ justifyContent: 'center', pb: 3, backgroundColor: 'rgb(255, 249, 230)' }}>
          <Button
            onClick={() => onFollowToggle(user.id)}
            variant="contained"
            color={isFollowing ? "error" : "primary"}
            sx={{ minWidth: 120, fontWeight: 'bold' }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button onClick={onClose} variant="outlined" sx={{ minWidth: 100 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default UserProfileModal;
  