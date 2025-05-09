import { Stack, Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

const styles = {
  container: {
    bgcolor: "#F9FAFB",
    p: { xs: "10px 20px", md: "20px 40px" },
    height: { xs: "60px", md: "80px" },
  },
  logo: {
    width: "120px",
    height: "auto",
    cursor: "pointer",
  },
};

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const isHomePage = pathname === "/";
  const isPlaceAdPage = pathname === "/ads/place-ad";
  const isPreviewAdPage = pathname === "/ads/preview-ad";
  const isProfilePage = pathname === "/profile";
  const previewPostedAd =
    pathname !== "/ads/preview-ad" && pathname.includes("/ads/preview-ad");

  const handleLogoClick = () => {
    router.push("/");
  };
  const handlePlaceAdClick = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found", token);
        router.push("/authentication/sign-in");
      } else {
        console.log("Token found", token);
        router.push("/ads/place-ad");
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  const handleReset = () => {
    console.log("Reset clicked");
    // Reset logic
  };

  const handlePublishAd = () => {
    console.log("Publish Ad clicked");
  };

  return (
    <Stack sx={styles.container}>
      {isHomePage && (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            src="/images/autocart-logo.svg"
            alt="autocart-logo"
            width={140}
            height={140}
            style={styles.logo}
            onClick={handleLogoClick}
          />
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Button
              onClick={handlePlaceAdClick}
              sx={{
                bgcolor: "#07B007",
                color: "#FFF",
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              Place Ad +
            </Button>
            <Image
              src="/images/filter-icon.svg"
              alt="filter"
              width={24}
              height={24}
            />
          </Stack>
        </Stack>
      )}

      {isPlaceAdPage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              onClick={handleBack}
              sx={{ minWidth: "auto", color: "#111827" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              Place Ad
            </Typography>

            <Button
              onClick={handleReset}
              sx={{
                minWidth: "auto",
                color: "#B91C1C",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Reset
            </Button>
          </Stack>
        </>
      )}

      {isPreviewAdPage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              onClick={handleBack}
              sx={{ minWidth: "auto", color: "#111827" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              Preview Ad
            </Typography>

            <Button
              onClick={handlePublishAd}
              sx={{
                bgcolor: "#07B007",
                color: "#FFF",
                fontSize: "14px",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#43A047",
                },
              }}
            >
              Publish Ad
            </Button>
          </Stack>
        </>
      )}

      {isProfilePage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              onClick={handleBack}
              sx={{ minWidth: "auto", color: "#111827" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              My Profile
            </Typography>

            <Button
              onClick={handleEdit}
              sx={{ minWidth: "auto", color: "#1F2937" }}
            >
              <EditIcon fontSize="small" />
            </Button>
          </Stack>
        </>
      )}

      {previewPostedAd && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="65%"
          >
            <Button
              onClick={handleBack}
              sx={{ minWidth: "auto", color: "#111827" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              Preview Ad
            </Typography>
          </Stack>
        </>
      )}

      {/* Other Pages */}
      {!isHomePage &&
        !isPlaceAdPage &&
        !isPreviewAdPage &&
        !isProfilePage &&
        !previewPostedAd && (
          <>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Button
                onClick={() => router.push("/")}
                sx={{
                  bgcolor: "#07B007",
                  color: "#FFF",
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                Dashboard
              </Button>
            </Stack>
          </>
        )}
    </Stack>
  );
};

export default Header;
