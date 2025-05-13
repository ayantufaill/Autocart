import AdTabs from "@/components/common/AdTabs/AdTabs";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import Loading from "@/components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFollowersByIdThunk } from "@/redux/slices/followerSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

interface FollowersCardProps {
  image: string;
}

const Followers = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.follower);
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(fetchFollowersByIdThunk(id));
    }
  }, [dispatch]);

  return (
    <Box sx={{ px: 4 }}>
      <AdTabs
        tabData={[
          {
            title: "Following",
            color: "#07B007",
            isActive: false,
            link: "/account/following",
          },
          {
            title: "Followers",
            color: "#07B007",
            isActive: true,
            link: "/account/followers",
          },
        ]}
        defaultTab={1}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <FollowersCard image="/images/user-image.jpeg" />
      )}
    </Box>
  );
};

export default Followers;

const FollowersCard: React.FC<FollowersCardProps> = ({ image }) => {
  return (
    <Stack direction={"row"} spacing={4} sx={{ alignItems: "center", my: 6 }}>
      <Image
        src={image}
        alt="user-image"
        width={40}
        height={40}
        style={{
          borderRadius: 12,
        }}
      />
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          borderBottom: "1px solid #CACACA",
          pb: "12px",
        }}
      >
        <Typography sx={{ fontSize: "16px", color: "#1F2937" }}>
          Theresa Webb
        </Typography>
        <Button
          sx={{
            fontSize: "12px",
            color: "#000",
            bgcolor: "#FEF2F2",
            width: "94px",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Unfollow
        </Button>
      </Stack>
    </Stack>
  );
};
