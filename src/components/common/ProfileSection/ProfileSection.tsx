import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserByIdThunk } from "@/redux/slices/userSlice";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

interface ProfileSectionProps {
  userId?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { userById } = useAppSelector((state) => state.user);
  const { followers, followings } = useAppSelector((state) => state.follower);
  const router = useRouter();

  useEffect(() => {
    const sendId = userId || localStorage.getItem("id");
    if (userId !== localStorage.getItem("id")) {
      if (sendId) dispatch(fetchUserByIdThunk(sendId));
    } else {
      router.push("/account");
    }
  }, [dispatch, userId, router]);

  return (
    <>
      <Box sx={{ position: "relative", width: "100%" }}>
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
          {userById?.name || "N/A"}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
          {userById?.address || "N/A"}
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
          { label: "Ad", count: "2", link: "/ads/my-ads" },
          {
            label: "Follower",
            count: followers?.length,
            link: userId
              ? `/account/followers/${userId}`
              : "/account/followers",
          },
          {
            label: "Following",
            count: followings?.length,
            link: userId
              ? `/account/following/${userId}`
              : "/account/following",
          },
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
