import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";

const UserModal = ({ open, handleClose }) => {
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
        <div className="flex flex-row gap-2 items-center justify-center">
        <FaUser />
        <Typography variant="h6" >
        Muhammad Hasnain
        </Typography>
        </div>
        <Typography variant="body2" sx={{ mb: 3 }}>
          hasnainmuhammad8425@gmail.com
          </Typography>
        
        <Button color="error" variant="contained" sx={{ width: "100%" }}>
          Logout
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModal;
