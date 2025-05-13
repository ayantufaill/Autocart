import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

interface AccountSidebar {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

const AccountSidebar: React.FC<AccountSidebar> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  // const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleOpen = () => {
    () => setSidebarOpen(true);
  };

  return (
    <>
      <Drawer open={sidebarOpen} onClose={handleClose}>
        <Box
          sx={{
            height: "100%",
            width: "233px",
            // bgcolor: "red",
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
          }}
        >
          <IconButton disableTouchRipple onClick={handleClose}>
            <Image
              src={"/images/close.svg"}
              alt="close"
              width={24}
              height={24}
              style={{ marginLeft: "16px", marginTop: "12px" }}
            />
          </IconButton>
          <Divider sx={{ mt: "12px" }} variant="fullWidth" />
          <Stack>
            {[
              {
                icon: "/images/profile-icon.png",
                label: "My Profile",
                link: "/profile",
              },
              { icon: "/images/ads-icon.png", label: "My Ads", link: "/" },
              { icon: "/images/view-icon.svg", label: "Viewed Ads", link: "/" },
              {
                icon: "/images/likes.svg",
                label: "Likes",
                link: "/account/likes",
              },
              { icon: "/images/about-icon.png", label: "About", link: "/" },
              {
                icon: "/images/terms-icon.png",
                label: "Terms of Service",
                link: "/",
              },
              {
                icon: "/images/privacy-icon.png",
                label: "Privacy Policy",
                link: "/",
              },
              { icon: "/images/support-icon.png", label: "Support", link: "/" },
            ].map((item, index) => (
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ px: 4, mt: "36px", alignItems: "center" }}
                key={index}
                onClick={() => router.push(item.link)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <Typography sx={{ fontSize: "16px", color: "#1F2937" }}>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Divider />
        <Stack sx={{ pb: "12px" }}>
          {[
            {
              icon: "/images/delete-icon.png",
              label: "Delete Account",
              handleClick: () => router.push("/account/delete-account"),
            },
            {
              icon: "/images/logout-icon.png",
              label: "Log out",
              handleClick: () => {
                localStorage.clear();
              },
            },
          ].map((item, index) => (
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ px: 4, mt: "26px", alignItems: "center" }}
              key={index}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <Typography sx={{ fontSize: "16px", color: "#DC2626" }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default AccountSidebar;
