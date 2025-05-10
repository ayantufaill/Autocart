import AdTabs from "@/components/common/AdTabs/AdTabs";
import Loading from "@/components/common/Loading/Loading";
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

interface AccountProps {
  id: string;
}

const Account: React.FC<AccountProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userById, loading } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (id) {
      dispatch(fetchUserByIdThunk(id));
    }
  }, [id, dispatch]);
  return loading ? (
    <Loading />
  ) : (
    <Box>
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
          {userById?.name}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
          {userById?.address}
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
          { label: "Follower", count: "20", link: "/follower" },
          { label: "Following", count: "50", link: "/following" },
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
      <AdTabs />
      {/* <Box sx={{ px: 2 }}>card</Box> */}
    </Box>
  );
};

export default Account;
