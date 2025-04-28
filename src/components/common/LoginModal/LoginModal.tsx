import { Apple, Close, Email, Facebook, Google } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";

interface LoginModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  handleSignInModalOpen: () => void;
}

const styles = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#FFF",
    p: 4,
    borderRadius: 2,
  },
  mainText: {
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
    my: 2,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  button: {
    color: "#1F2937",
    borderColor: "#1F2937",
    width: "100%",
    textTransform: "capitalize",
  },
  textPolicy: {
    fontSize: "10px",
    maxWidth: 200,
    textAlign: "center",
    mx: "auto",
    mt: 1,
  },
};

const LoginModal: React.FC<LoginModalProps> = ({
  handleSignInModalOpen,
  modalOpen,
  handleModalClose,
}) => {
  const loginOptions = [
    { label: "Continue with Facebook", icon: <Facebook />, href: "/" },
    { label: "Continue with Google", icon: <Google />, href: "/" },
    { label: "Continue with Apple", icon: <Apple />, href: "/" },
    { label: "Continue with Email", icon: <Email />, href: "/" },
  ];
  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box sx={styles.modalWrapper}>
        <Typography sx={styles.mainText}>Login to post Ad</Typography>
        <Box sx={styles.buttonWrapper}>
          {loginOptions.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              disableTouchRipple
              startIcon={option.icon}
              sx={styles.button}
            >
              {option.label}
            </Button>
          ))}
          <Button
            onClick={() => {
              handleModalClose();
              handleSignInModalOpen();
            }}
            sx={{ textTransform: "capitalize" }}
            disableTouchRipple
            color="error"
          >
            Don&apos;t have an account? Create one
          </Button>
        </Box>
        <Typography sx={styles.textPolicy}>
          By signing up I agree to the{" "}
          <span style={{ color: "#2563EB" }}>Terms and Conditions</span> and{" "}
          <span style={{ color: "#2563EB" }}>Privacy Policy</span>
        </Typography>
        <IconButton
          onClick={handleModalClose}
          sx={{ position: "absolute", top: 2, right: 2 }}
        >
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default LoginModal;
