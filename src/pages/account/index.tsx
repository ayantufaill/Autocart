// import AccountSidebar from "@/components/common/AccountSidebar/AccountSidebar";
import ProfileSection from "@/components/common/ProfileSection/ProfileSection";
import ActiveAds from "./active-ads";
import { Stack, Button, Grid, Modal, Box, Typography } from "@mui/material";
import StatusAdsCard from "@/components/common/AdsCard/StatusAdsCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  // fetchFollowersByIdThunk,
  fetchFollowingByIdThunk,
  followByIdThunk,
  unfollowByIdThunk,
} from "@/redux/slices/followerSlice";
import Loading from "@/components/common/Loading/Loading";

// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   // Fetch data using id, etc.
//   return {
//     props: { id }, // Will be passed to the page component as props
//   };
// }

interface AccountProps {
  id: string;
}

const styles = {
  followButton: {
    color: "#1F2937",
    width: "82px",
    height: "31px",
    fontSize: "12px",
    borderRadius: 2,
    my: "20px",
  },
};

const Account: React.FC<AccountProps> = ({ id = "" }) => {
  // return <AccountSidebar sidebarOpen={false} />;
  const dispatch = useAppDispatch();
  const { loading, followings } = useAppSelector((state) => state.follower);
  const isFollowing = followings.find((item) => item?.following?.id === id);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) dispatch(fetchFollowingByIdThunk(id));
  }, [dispatch]);

  const handleFollow = () => {
    const followerId = localStorage.getItem("id");
    if (followerId) {
      dispatch(followByIdThunk({ followerId, followingId: id }))
        .unwrap()
        .then((data) => {
          dispatch(fetchFollowingByIdThunk(data?.followerId));
        });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUnfollow = () => {
    const followerId = localStorage.getItem("id");
    if (followerId) {
      dispatch(unfollowByIdThunk({ followerId, followingId: id }));
    }
    handleClose();
  };

  return id ? (
    loading ? (
      <Loading />
    ) : (
      <>
        <Stack sx={{ alignItems: "center" }}>
          <ProfileSection userId={id} />
          <Button
            onClick={isFollowing ? handleOpen : handleFollow}
            sx={{
              ...styles.followButton,
              bgcolor: isFollowing ? "#FEF2F2" : "#F0FDF4",
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Grid spacing={2} sx={{ px: 2 }} container>
            {Array(4)
              .fill(1)
              .map((_, index) => (
                <StatusAdsCard key={index} />
              ))}
          </Grid>
        </Stack>
        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
        >
          <Stack
            justifyContent={"space-between"}
            sx={{
              bgcolor: "#FFF",
              width: "200px",
              height: "140px",
              borderRadius: 3,
              py: 3,
            }}
          >
            <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
              Are you sure, you want to Unfollow?
            </Typography>
            <Stack
              sx={{ px: 2 }}
              spacing={2}
              direction={"row"}
              justifyContent={"end"}
            >
              <Button
                size="small"
                sx={{ fontSize: "12px", color: "black" }}
                variant="text"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                size="small"
                sx={{ fontSize: "12px", bgcolor: "#DC2626" }}
                variant="contained"
                onClick={handleUnfollow}
              >
                Yes
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </>
    )
  ) : (
    <ActiveAds />
  );
};

export default Account;
