import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MessageIcon from "@mui/icons-material/Message";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { useRouter } from "next/router";

const styles = {
  sidebarConteiner: {
    bgcolor: "#F9FAFB",
    borderTop: { xs: "1px solid #e0e0e0", md: "none" },
    height: { md: "89vh" },
    maxWidth: { md: 200, lg: 240, xl: 260 },
    pl: { xs: 1, md: 2 },
    py: { xs: 1, md: 2 },
    pr: { xs: 1, md: 0 },
    gap: 1,
  },
  sidebarWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: { xs: "center", md: "start" },
    alignItems: { xs: "center", md: "center" },
    gap: 2,
    py: { xs: 2, md: 2 },
    px: { md: 3 },
    borderRadius: { xs: 2, md: 0 },
    borderTopLeftRadius: { md: 14 },
    borderBottomLeftRadius: { md: 14 },
    ":hover": {
      color: "#FFF",
      bgcolor: "#07B007",
    },
  },
  text: {
    visibility: { xs: "hidden", md: "visible" },
  },
};

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const sidebarItems = [
    { icon: <DirectionsCarIcon />, label: "Cars", link: "/" },
    { icon: <SearchIcon />, label: "Search", link: "/search" },
    { icon: <QrCodeScannerIcon />, label: "Scan", link: "/scan" },
    { icon: <MessageIcon />, label: "Messages", link: "/messages" },
    {
      icon: <AutoStoriesOutlinedIcon />,
      label: "Story",
      link: "/ads/stroy-name",
    },
    { icon: <AccountBoxIcon />, label: "Account", link: "/account" },
  ];

  return isMobile ? (
    <Stack direction={{ xs: "row", md: "column" }} sx={styles.sidebarConteiner}>
      {sidebarItems.map((item, index) => (
        <Stack
          onClick={() => router.push(item.link)}
          key={index}
          sx={{
            ...styles.sidebarWrapper,
            bgcolor: router.pathname.includes(item.label.toLowerCase())
              ? "#07B007"
              : "transparent",
            color: router.pathname.includes(item.link) ? "#FFF" : "#6B7280",
          }}
        >
          {item.icon}
          {!isMobile && (
            <Typography variant="body1" sx={styles.text}>
              {item.label}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  ) : (
    <></>
  );
};

export default Sidebar;
