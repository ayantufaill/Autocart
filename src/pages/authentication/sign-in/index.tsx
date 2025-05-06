import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUserThunk } from "@/redux/slices/authSlice";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleLogin = () => {
    dispatch(loginUserThunk({ email, password }))
    .unwrap()
    .then((res: unknown) => {
      console.log("Login Success:", res);
      router.push("/");
    })
    .catch((err: unknown) => {
      console.error("Login Error:", err);
    });
  };

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
          {/* <img
            src="/Images/logo.png"
            alt="Autocart Logo"
            style={{ height: 60, width: "auto" }}
          /> */}
          <Image
            src={"/images/logo.png"}
            alt="Autocart-logo"
            width={60}
            height={60}
            style={{ width: "auto" }}
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
            Email
          </Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#DCFCE7",
            color: "#15803D",
            borderRadius: "30px",
            fontWeight: "bold",
            mt: 2,
            py: 1.5,
            "&:hover": { backgroundColor: "#46C271" },
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Typography mt={3} fontSize="14px" sx={{ color: "#9CA3AF" }}>
          Already have an account?{" "}
          <Link
            onClick={() => router.push("/authentication/sign-up")}
            underline="always"
            sx={{ color: "#15803D", fontWeight: "bold", cursor: "pointer" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
