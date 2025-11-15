import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { getMe, logoutUser } from "../Services/authService";
import { useNavigate } from "react-router-dom";

const UserModal = ({ open, handleClose }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user info when modal opens
  useEffect(() => {
    if (open) {
      const fetchUser = async () => {
        try {
          const data = await getMe(); 
          setUser(data);
        } catch (err) {
          console.log("User not logged in");
          setUser(null);
        }
      };
      fetchUser();
    }
  }, [open]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      handleClose();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="user-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <div className="flex flex-row gap-2 items-center justify-center mb-2">
          <FaUser size={24} />
          <Typography variant="h6">
            {user ? user.name : "Guest"}
          </Typography>
        </div>

        <Typography variant="body2" sx={{ mb: 3 }}>
          {user ? user.email : "You are not logged in."}
        </Typography>

        {user ? (
          <Button
            color="error"
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleLoginRedirect}
          >
            Login
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default UserModal;
