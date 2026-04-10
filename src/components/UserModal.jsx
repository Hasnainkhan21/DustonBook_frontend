import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { logoutUser } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const modalStyle = {
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
};

const UserModal = ({ open, handleClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore logout errors — still clear local state
    } finally {
      logout();
      handleClose();
      navigate("/");
    }
  };

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="user-modal-title">
      <Box sx={modalStyle}>
        <div className="flex flex-row gap-2 items-center justify-center mb-2">
          <FaUser size={24} />
          <Typography id="user-modal-title" variant="h6">
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
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            fullWidth
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
