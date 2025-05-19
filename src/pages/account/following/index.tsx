import AdTabs from "@/components/common/AdTabs/AdTabs";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import Loading from "@/components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFollowingByIdThunk,
  unfollowByIdThunk,
} from "@/redux/slices/followerSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

interface FollowingProps {
  userId: string;
}

const Following: React.FC<FollowingProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { loading, error, followings, followers } = useAppSelector(
    (state) => state.follower
  );

  useEffect(() => {
    const id = userId || localStorage.getItem("id");
    if (id) {
      dispatch(fetchFollowingByIdThunk(id));
    }
  }, [dispatch, userId]);

  const handleUnfollow = (followingId: string) => {
    const followerId = localStorage.getItem("id");
    if (followerId && followingId) {
      dispatch(unfollowByIdThunk({ followerId, followingId }));
    }
  };

  return (
    <Box sx={{ px: 4 }}>
      {!userId && (
        <AdTabs
          tabData={[
            {
              title: `Following (${followings?.length})`,
              color: "#07B007",
              isActive: true,
              link: userId
                ? `/account/following/${userId}`
                : "/account/following",
            },
            {
              title: `Followers (${followers?.length})`,
              color: "#07B007",
              isActive: false,
              link: userId
                ? `/account/followers/${userId}`
                : "/account/followers",
            },
          ]}
          defaultTab={0}
        />
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} />
      ) : followings && followings.length > 0 ? (
        followings.map((item) => (
          <FollowingCard
            key={item?.id}
            handleUnfollow={handleUnfollow}
            name={item?.following?.name}
            image="/images/user-image.jpeg"
            followingId={item?.following?.id}
          />
        ))
      ) : (
        <Typography>No followings found</Typography>
      )}
    </Box>
  );
};

export default Following;

interface FollowingCardProps {
  image: string;
  isFollowing?: boolean;
  name: string;
  followingId: string;
  handleUnfollow: (followingId: string) => void;
}

const FollowingCard: React.FC<FollowingCardProps> = ({
  image,
  isFollowing = true,
  name,
  followingId,
  handleUnfollow,
}) => {
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
          {name}
        </Typography>
        <Button
          onClick={() => handleUnfollow(followingId)}
          sx={{
            fontSize: "12px",
            color: "#000",
            bgcolor: isFollowing ? "#F9FAFB" : "#EFF6FF",
            width: isFollowing ? "98px" : "109px",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {isFollowing ? "Following" : "Follow back"}
        </Button>
      </Stack>
    </Stack>
  );
};
