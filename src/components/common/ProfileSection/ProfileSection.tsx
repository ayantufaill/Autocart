import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserByIdThunk } from "@/redux/slices/userSlice";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const styles = {
  profileImageWrapper: {
    borderRadius: "50%",
    padding: "5px",
    border: "1px solid #07B007",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
    left: "50%",
    transform: "translateX(-50%)",
  },
  coverImageWrapper: {
    position: "relative",
    maxHeight: { xs: "149px", md: "159px" },
    overflow: "hidden",
  },
};

const ProfileSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userById } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<{ name: string; address: string }>({
    name: "N/A",
    address: "N/A",
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const newUser = JSON.parse(localStorage.getItem("loggedInUser") || "");

    setUser({ name: newUser.name, address: newUser?.address });

    if (id && !newUser?.address) {
      dispatch(fetchUserByIdThunk(id))
        .unwrap()
        .then((data) => {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              name: data?.name,
              address: data?.address,
              email: data?.email,
            })
          );
        });
    }
  }, [dispatch]);

  const router = useRouter();
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box sx={styles.coverImageWrapper}>
          <Image
            src={"/images/user-cover-image.svg"}
            alt="cover-image"
            width={200}
            height={200}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={styles.profileImageWrapper}>
          <Image
            src={"/images/user-image.avif"}
            alt="user-image"
            width={96}
            height={96}
            style={{
              borderRadius: "50%",
            }}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", pt: 3 }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, color: "#1F2937" }}
        >
          {userById?.name || user?.name}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
          {userById?.address || user?.address}
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        spacing={3}
        sx={{
          mt: 2,
          justifyContent: "center",
          pl: 4,
        }}
      >
        {[
          { label: "Ad", count: "80", link: "/ads/my-ads" },
          { label: "Follower", count: "20", link: "/account/followers" },
          { label: "Following", count: "50", link: "/account/following" },
        ].map((item, index) => (
          <Stack
            key={index}
            onClick={() => router.push(item.link)}
            sx={{
              pr: index !== 2 ? 6 : 0,
              borderRight: index !== 2 ? "1px solid #CACACA" : "none",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
              {item.count}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default ProfileSection;
