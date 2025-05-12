import React, { useState } from "react";
import { Box, Typography, Button, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyUserThunk, resetAuthState } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";

export default function OTPVerification() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.auth
  );
  const { email } = useAppSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    const payload = email !== null ? { email, code: finalOtp } : null;
    if (payload === null) {
      toast.error("Email is required");
      return;
    }
    console.log("Sending payload:", payload);

    const actionn = await dispatch(verifyUserThunk(payload));

    // Check API response using action
    if (verifyUserThunk.fulfilled.match(actionn)) {
      const message =
        actionn.payload?.message || "Account verified successfully!";
      toast.success(message);
      console.log("Account verified successfully!", actionn.payload.message);
      router.push("/authentication/sign-in"); // ✅ Redirect on success
      dispatch(resetAuthState()); // Clear auth state
    } else {
      toast.error("OTP verification failed.");
    }
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 4,
          }}
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

        <Typography fontWeight="bold" fontSize={18} mb={1} color="#15803D">
          Verification
        </Typography>
        <Typography fontSize={14} color="#9CA3AF" mb={3}>
          We have sent an OTP to{" "}
          <span style={{ fontWeight: "bold" }}>{email}</span>
        </Typography>

        <Box display="flex" justifyContent="center" gap={1} mb={3}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#9CA3AF",
                },
              }}
              sx={{
                width: "45px",
                backgroundColor: "#FFFF",
                "& fieldset": { borderColor: "#" },
              }}
            />
          ))}
        </Box>

        <Button
          onClick={handleVerify}
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#3C8C3A",
            color: "white",
            borderRadius: "30px",
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          {loading ? "Verifying..." : "Continue"}
        </Button>

        <Typography mt={3} fontSize="14px" color="#9CA3AF">
          Didn’t receive yet?{" "}
          <Link
            onClick={() => console.log("Resend OTP")}
            underline="always"
            sx={{ color: "#3C8C3A", fontWeight: "bold", cursor: "pointer" }}
          >
            Resend
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
