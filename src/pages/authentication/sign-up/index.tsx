import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  registerUserThunk,
  resetAuthState,
  setAuthEmail,
} from "@/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, success, error, message } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phoneNumber: "",
    email: "",
    password: "",
    status: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      //   role: "",
      address: "Lahore",
      vatNumber: "1234567",
      dealerLicense: "12345678",
      profileImage: "https://via.placeholder.com/150",
      backgroundImage: "https://via.placeholder.com/150",
    };

    await dispatch(registerUserThunk(payload));
  };

  useEffect(() => {
    if (success) {
      setShowToast(true);
      setTimeout(() => {
        dispatch(setAuthEmail(formData.email));
        console.log("Email set:", formData.email);
        router.push("/authentication/otp");
        dispatch(resetAuthState());
      }, 2000);
    }
  }, [success, router, dispatch]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        color: "white",
        padding: "16px",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={4}
        >
          <img
            src="/Images/Header/logo.png"
            alt="Autocart Logo"
            style={{ height: 60, width: "auto" }}
          />
          <Typography variant="h6" fontWeight="bold" color="#15803D">
            AUTOCART
          </Typography>
        </Box>
        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Full Name
          </Typography>
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            variant="outlined"
            InputProps={{
              style: { color: "#9CA3AF" },
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& input::placeholder": { color: "#9CA3AF" },
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          />
        </Box>

        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Role
          </Typography>
          <TextField
            fullWidth
            select
            name="role"
            value={formData.role}
            onChange={handleChange}
            variant="outlined"
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                selected && typeof selected === "string" ? (
                  selected
                ) : (
                  <span style={{ color: "#9CA3AF" }}>Select your role</span>
                ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          >
            <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
            <MenuItem value="TRADER_SELLER">TRADER_SELLER</MenuItem>
            <MenuItem value="PRIVATE_SELLER">PRIVATE_SELLER</MenuItem>
          </TextField>
        </Box>

        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Status
          </Typography>
          <TextField
            fullWidth
            select
            name="status"
            value={formData.status}
            onChange={handleChange}
            variant="outlined"
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                selected && typeof selected === "string" ? (
                  selected
                ) : (
                  <span style={{ color: "#9CA3AF" }}>Select your status</span>
                ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
            <MenuItem value="BANNED">BANNED</MenuItem>
          </TextField>
        </Box>
        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Phone Number
          </Typography>
          <TextField
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            variant="outlined"
            InputProps={{
              style: { color: "#9CA3AF" },
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& input::placeholder": { color: "#9CA3AF" },
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          />
        </Box>
        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            variant="outlined"
            InputProps={{
              style: { color: "#9CA3AF" },
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& input::placeholder": { color: "#9CA3AF" },
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          />
        </Box>
        <Box textAlign="left" mb={2}>
          <Typography
            fontWeight="medium"
            fontSize={14}
            mb={1}
            sx={{ color: "#15803D" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              style: { color: "#9CA3AF" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? (
                      <Visibility sx={{ color: "#8A8A8A" }} />
                    ) : (
                      <VisibilityOff sx={{ color: "#8A8A8A" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              "& input::placeholder": { color: "#9CA3AF" },
              "& fieldset": { borderColor: "#F9F9F9" },
              "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
              "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
            }}
          />
        </Box>
        {error && (
          <Typography color="error" mt={1} fontSize="14px">
            {error}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#3C8C3A",
            color: "white",
            borderRadius: "30px",
            fontWeight: "bold",
            mt: 2,
            py: 1.5,
            "&:hover": { backgroundColor: "#2E6B2D" },
          }}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Typography mt={3} fontSize="14px" sx={{ color: "#9CA3AF" }}>
          Already have an account?{" "}
          <Link
            onClick={() => router.push("/authentication/sign-in")}
            underline="always"
            sx={{ color: "#3C8C3A", fontWeight: "bold", cursor: "pointer" }}
          >
            Sign In
          </Link>
        </Typography>
        <Snackbar
          open={showToast}
          autoHideDuration={2000}
          onClose={() => setShowToast(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowToast(false)}
            severity="success"
            sx={{ width: "100%", color: "#9CA3AF" }}
          >
            Please verify your email to continue!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
