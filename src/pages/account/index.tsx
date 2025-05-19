import ProfileSection from "@/components/common/ProfileSection/ProfileSection";
import ActiveAds from "./active-ads";
import { Stack, Button, Grid, Modal, Typography } from "@mui/material";
import StatusAdsCard from "@/components/common/AdsCard/StatusAdsCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFollowersByIdThunk,
  fetchFollowingByIdThunk,
  followByIdThunk,
  unfollowByIdThunk,
} from "@/redux/slices/followerSlice";
import Loading from "@/components/common/Loading/Loading";
import { postNotificationThunk } from "@/redux/slices/notificationSlice";
import { fetchAdsThunk } from "@/redux/slices/adsSlice";

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
  const dispatch = useAppDispatch();
  const { loading, followers } = useAppSelector((state) => state.follower);
  const { ads } = useAppSelector((state) => state.ads);
  const isFollowing = followers.find(
    (item) => item?.followerId === localStorage.getItem("id")
  );

  const [open, setOpen] = useState(false);

  const handleFollow = () => {
    const followerId = localStorage.getItem("id");
    if (followerId) {
      dispatch(followByIdThunk({ followerId, followingId: id }))
        .unwrap()
        .then((data) => {
          console.log(data);
          dispatch(fetchFollowersByIdThunk(id));
          dispatch(
            postNotificationThunk({
              userId: followerId,
              content: "Started Following you. Do you want to follow back?",
              link: "Link of any content",
              type: "NEW_FOLLOWER",
              isRead: false,
              isBroadcast: false,
            })
          );
        });
    }
  };

  const handleUnfollow = () => {
    const followerId = localStorage.getItem("id");
    if (followerId) {
      dispatch(unfollowByIdThunk({ followerId, followingId: id }));
    }
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const myId = id || localStorage.getItem("id");
    if (myId) {
      dispatch(fetchFollowingByIdThunk(myId));
      dispatch(fetchFollowersByIdThunk(myId));
      dispatch(fetchAdsThunk(false));
    }
  }, [id, dispatch]);

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
            {ads.map((item, index) => (
              <StatusAdsCard data={item} key={index} />
            ))}
          </Grid>
        </Stack>
        <UnfollowModal
          open={open}
          handleClose={handleClose}
          handleUnfollow={handleUnfollow}
        />
      </>
    )
  ) : (
    <ActiveAds />
  );
};

export default Account;

interface UnfollowModalProps {
  open: boolean;
  handleClose: () => void;
  handleUnfollow: () => void;
}

const UnfollowModal: React.FC<UnfollowModalProps> = ({
  open,
  handleClose,
  handleUnfollow,
}) => {
  const styles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalWrapper: {
      bgcolor: "#FFF",
      width: "200px",
      height: "140px",
      borderRadius: 3,
      py: 3,
      justifyContent: "space-between",
    },
  };
  return (
    <Modal sx={styles.modal} open={open} onClose={handleClose}>
      <Stack sx={styles.modalWrapper}>
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Are you sure, you want to Unfollow?
        </Typography>
        <Stack
          sx={{ px: 2, justifyContent: "flex-end" }}
          spacing={2}
          direction={"row"}
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
  );
};
