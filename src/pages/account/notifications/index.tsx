import Loading from "@/components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFollowersByIdThunk,
  followByIdThunk,
} from "@/redux/slices/followerSlice";
import {
  FetchNotificationsThunk,
  postNotificationThunk,
} from "@/redux/slices/notificationSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NotificationCardProps {
  data: {
    image: string;
    name: string;
    content: string;
    time: string;
    type: string;
    userId: string;
    createdAt: string;
  };
}

const Notifications = () => {
  const dispatch = useAppDispatch();
  const { loading, notifications } = useAppSelector(
    (state) => state.notifications
  );

  const myId = localStorage.getItem("id");

  useEffect(() => {
    dispatch(FetchNotificationsThunk());
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Box>
      {notifications.map(
        (item, index) =>
          item?.userId != myId && <NotificationCard key={index} data={item} />
      )}
    </Box>
  );
};

export default Notifications;

const NotificationCard: React.FC<NotificationCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { followers } = useAppSelector((state) => state.follower);
  const [showBtn, setShowBtn] = useState(true);
  const [isFollowing, setIsFollowing] = useState(
    followers.find((item) => item?.followerId === localStorage.getItem("id"))
  );

  const handleAccept = () => {
    setIsFollowing(true);
    const followerId = localStorage.getItem("id");
    if (followerId) {
      dispatch(
        followByIdThunk({
          followerId,
          followingId: data?.userId,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            postNotificationThunk({
              userId: followerId,
              content: "Started Following you back.",
              link: "Link of any content",
              type: "NEW_FOLLOWER",
              isRead: false,
              isBroadcast: false,
            })
          );
        });
    }
  };
  const handleReject = () => {
    setShowBtn(false);
  };

  useEffect(() => {
    dispatch(fetchFollowersByIdThunk(data?.userId))
      .unwrap()
      .then((followers) => {
        const id = localStorage.getItem("id");
        setIsFollowing(followers.find((item: any) => item?.followerId === id));
      });
  }, []);

  return (
    <Stack direction={"row"} spacing={2} sx={{ px: 4, my: 6 }}>
      <Image
        src={data?.image || "/images/user-image.jpeg"}
        alt="user-image"
        width={40}
        height={40}
        style={{
          borderRadius: 12,
        }}
      />
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          borderBottom: "1px solid #CACACA",
          pb: "14px",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1}>
          <Link
            href={`/account/${data?.userId}`}
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#1F2937",
            }}
          >
            {data?.name || "Ali"}
          </Link>
          <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>
            {data?.content}
          </Typography>
          {data?.type === "NEW_FOLLOWER" && showBtn && !isFollowing && (
            <Stack spacing={1} direction={"row"}>
              <Button
                onClick={handleReject}
                size="small"
                sx={{ color: "#000" }}
                variant="text"
              >
                No
              </Button>
              <Button
                onClick={handleAccept}
                size="small"
                sx={{ bgcolor: "#07B007", color: "#FFF" }}
              >
                Yes
              </Button>
            </Stack>
          )}
          {!showBtn && (
            <Typography sx={{ fontSize: "12px", color: "#F44336" }}>
              You declined the follow request.
            </Typography>
          )}
          {isFollowing && (
            <Typography sx={{ fontSize: "12px", color: "#07B007" }}>
              You are following.
            </Typography>
          )}
        </Stack>
        <Typography
          sx={{ fontSize: "10px", color: "#9CA3AF", minWidth: "50px" }}
        >
          {formatDistanceToNow(new Date(data?.createdAt))}
        </Typography>
      </Stack>
    </Stack>
  );
};
