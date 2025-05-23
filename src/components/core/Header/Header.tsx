import { Stack, Button, Typography, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { Notifications, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountSidebar from "@/components/common/AccountSidebar/AccountSidebar";

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { pathname } = router;

  const isHomePage = pathname === "/";
  const isPlaceAdPage = pathname === "/ads/place-ad";
  const isPreviewAdPage = pathname === "/ads/preview-ad";
  const isProfilePage = pathname === "/profile";
  const previewPostedAd =
    pathname !== "/ads/preview-ad" && pathname.includes("/ads/preview-ad");
  const isAccountPage = pathname.includes("account");
  const isStoryPage = pathname === "/story";
  const isMyAdsPage = pathname === "/ads/my-ads";
  const isEditAdPage = pathname.includes("/ads/edit-ad");

  const handleLogoClick = () => {
    router.push("/");
  };
  // const handlePlaceAdClick = () => {
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       console.log("No token found", token);
  //       router.push("/authentication/sign-in");
  //     } else {
  //       console.log("Token found", token);
  //       // router.push("/ads/place-ad");
  //     }
  //   }
  // };

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
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                bgcolor: "#07B007",
                color: "#FFF",
                fontSize: { xs: "12px", md: "14px" },
                textTransform: "none",
              }}
            >
              Manage Ads
            </Button>

            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              {[
                { link: "/ads/place-ad", label: "Place Ad+" },
                { link: "/ads/my-ads", label: "My Ads" },
              ].map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{
                    ":hover": { color: "#FFF", bgcolor: "#07B007" },
                    fontSize: { xs: "12px", md: "14px" },
                  }}
                  onClick={() => {
                    if (typeof window != "undefined") {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        router.push("/authentication/sign-in");
                      } else {
                        router.push(item.link);
                      }
                    }
                    setAnchorEl(null);
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

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

      {isAccountPage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              onClick={() => {
                console.log("menu");
                setSidebarOpen(true);
              }}
              sx={{ minWidth: "auto", color: "#111827" }}
            >
              <MenuIcon fontSize="small" />
            </Button>

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              My Account
            </Typography>

            <Button
              onClick={() => {
                router.push("/account/notifications");
              }}
              sx={{ minWidth: "auto", color: "#1F2937" }}
            >
              <Notifications fontSize="small" />
            </Button>
          </Stack>
          <AccountSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
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
      {isStoryPage && (
        <>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                color: "#111827",
                mr: 15,
              }}
            >
              Story
            </Typography>
            <Button sx={{ minWidth: "auto", color: "#111827" }}>
              <Search />
            </Button>
          </Stack>
        </>
      )}

      {isMyAdsPage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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
                fontSize: "20px",
                color: "#111827",
                mr: 15,
              }}
            >
              My Ads
            </Typography>
          </Stack>
        </>
      )}

      {isEditAdPage && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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
                fontSize: "20px",
                color: "#111827",
                mr: 15,
              }}
            >
              Edit Ad
            </Typography>
          </Stack>
        </>
      )}

      {/* Other Pages */}
      {!isHomePage &&
        !isPlaceAdPage &&
        !isPreviewAdPage &&
        !isProfilePage &&
        !previewPostedAd &&
        !isAccountPage &&
        !isStoryPage &&
        !isMyAdsPage &&
        !isEditAdPage && (
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
