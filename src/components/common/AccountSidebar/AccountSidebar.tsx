import { Close } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

interface AccountSidebar {
  sidebarOpen: boolean;
}

const AccountSidebar: React.FC<AccountSidebar> = ({ sidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(sidebarOpen)

  return (
    <>
      <Button onClick={() => setOpen(true)}>here</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            height: "100%",
            width: "233px",
            // bgcolor: "red",
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
          }}
        >
          <Button onClick={() => setOpen(false)}>
            <Close fontSize="small" sx={{ color: "#1F2937" }} />
          </Button>
          <Divider sx={{ mt: "24px" }} variant="fullWidth" />
          <Stack>
            {[
              { icon: "", label: "My Profile", link: "/account" },
              { icon: "", label: "My Ads", link: "/" },
              { icon: "/images/view-icon.svg", label: "Viewed Ads", link: "/" },
              {
                icon: "/images/likes.svg",
                label: "Likes",
                link: "/account/likes",
              },
              { icon: "", label: "About", link: "/" },
              { icon: "", label: "Terms of Service", link: "" },
              { icon: "", label: "Privacy Policy", link: "" },
              { icon: "", label: "Support", link: "" },
            ].map((item, index) => (
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ px: 4, mt: "36px", alignItems: "center" }}
                key={index}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                />
                <Typography sx={{ fontSize: "16px", color: "#1F2937" }}>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Divider />
        <Stack>
          {[
            {
              icon: "",
              label: "Delete Account",
              handleClick: () => router.push("/account/delete-account"),
            },
            {
              icon: "",
              label: "Log out",
              handleClick: () => {
                localStorage.clear();
              },
            },
          ].map((item, index) => (
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ px: 4, mt: "26px" }}
              key={index}
            >
              <Image src={item.icon} alt={item.label} width={16} height={16} />
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
