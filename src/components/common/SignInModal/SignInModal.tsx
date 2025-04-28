import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { Close } from "@mui/icons-material";
import InputField from "../InputField/InputField";

interface SignInModalProps {
  open: boolean;
  handleSignInModalClose: () => void;
}

const styles = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#F9F9F9",
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  button: {
    color: "#FFF",
    width: "100%",
    bgcolor: "#3C8C3A",
    borderRadius: 5,
    my: 2,
  },
  selectInput: {
    color: "#9CA3AF",
    bgcolor: "#FFF",
    borderColor: "transparent",
    width: "100%",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
};

const SignInModal: React.FC<SignInModalProps> = ({
  open,
  handleSignInModalClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phoneNumber: "",
    email: "",
    password: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal open={open} onClose={handleSignInModalClose}>
      <Box sx={styles.modalWrapper}>
        <Image
          src={"/images/autocart-logo.svg"}
          alt="autocart-logo"
          width={100}
          height={100}
        />
        <Box width={"100%"}>
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
        </Box>
        <Box width={"100%"}>
          <InputField
            label="Phone number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            handleChange={handleChange}
          />
        </Box>
        <Box width={"100%"}>
          <InputField
            label="Email"
            placeholder="Enter your Email"
            name="email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
          />
        </Box>
        <Box width={"100%"}>
          <InputField
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formData.password}
            handleChange={handleChange}
          />
        </Box>
        <Select
          name="role"
          value={formData.role}
          onChange={handleSelectChange}
          defaultValue="Super_Admin"
          sx={styles.selectInput}
        >
          <MenuItem value="Super_Admin">Super_Admin</MenuItem>
          <MenuItem value="Private_Admin">Private_Admin</MenuItem>
          <MenuItem value="Trader_Admin">Trader_Admin</MenuItem>
        </Select>
        <Select
          name="status"
          value={formData.status}
          onChange={handleSelectChange}
          defaultValue="Active"
          sx={styles.selectInput}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Suspended">Suspended</MenuItem>
          <MenuItem value="Banned">Banned</MenuItem>
        </Select>
        <Button variant="contained" disableTouchRipple sx={styles.button}>
          Sign up
        </Button>
        <IconButton
          onClick={handleSignInModalClose}
          sx={{ position: "absolute", top: 2, right: 2 }}
        >
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default SignInModal;
