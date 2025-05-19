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
  name: string;
  isFollowing: boolean;
  handleClick: () => void;
}

interface FollowersProps {
  userId?: string;
}

const Followers: React.FC<FollowersProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { loading, error, followers, followings } = useAppSelector(
    (state) => state.follower
  );
  const isFollowing = false; // static
  const handleFollowBack = () => {
    console.log("handle follow back ");
  };
  const handleUnfollow = () => {
    console.log("Unfollow if already following");
  };

  useEffect(() => {
    const id = userId || localStorage.getItem("id");
    if (id) {
      dispatch(fetchFollowersByIdThunk(id));
    }
  }, [userId, dispatch]);

  return (
    <Box sx={{ px: 4 }}>
      {!userId && (
        <AdTabs
          tabData={[
            {
              title: `Following (${followings?.length})`,
              color: "#07B007",
              isActive: false,
              link: userId
                ? `"/account/following"/${userId}`
                : "/account/following",
            },
            {
              title: `Followers (${followers?.length})`,
              color: "#07B007",
              isActive: true,
              link: userId
                ? `"/account/followers"/${userId}`
                : "/account/followers",
            },
          ]}
          defaultTab={1}
        />
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        followers.map((item) => (
          <FollowersCard
            key={item?.follower?.id}
            name={item?.follower?.name}
            image="/images/user-image.jpeg"
            isFollowing={isFollowing}
            handleClick={isFollowing ? handleUnfollow : handleFollowBack}
          />
        ))
      )}
    </Box>
  );
};

export default Followers;

const FollowersCard: React.FC<FollowersCardProps> = ({
  image,
  name,
  isFollowing,
  handleClick,
}) => {
  console.log(handleClick);
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
        {/* <Button
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
        </Button> */}
        <Button
          // onClick={() => handleUnfollow(followingId)}
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
