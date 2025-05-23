import { Button, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const styles = {
  userInfo: {
    flexDirection: { xs: "row", sm: "row" },
    gap: 2,
    alignItems: "start",
    justifyContent: { xs: "space-between", sm: "flex-start" },
  },
  userName: {
    fontSize: { xs: "16px", md: "18px" },
    fontWeight: { xs: 500, md: 600 },
    color: "#1F2937",
  },
  userTimestamp: {
    fontSize: { xs: "12px", md: "14px" },
    color: "#9CA3AF",
  },
  tradeButton: {
    color: "#1D4ED8",
    bgcolor: "#EFF6FF",
    borderRadius: 1,
    height: 35,
    ml: { xs: 0, sm: 2 },
    mt: "7px",
  },
};

interface UserProfileCardProps {
  image: string;
  username: string;
  role?: string;
  date?: string;
  id?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  image,
  username,
  role,
  date,
  id,
}) => {
  const router = useRouter();
  console.log(image);
  return (
    <Stack sx={styles.userInfo}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={
            image === "https://via.placeholder.com/150"
              ? "/images/user-image.avif"
              : image
          }
          alt="user-avatar"
          width={43}
          height={43}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Stack>
          <Typography
            onClick={() => {
              router.push(`/account/${id}`);
            }}
            sx={{
              ...styles.userName,
              fontSize: username?.length > 12 ? "15px" : "16px",
            }}
          >
            {username}
          </Typography>
          {date && (
            <Typography sx={styles.userTimestamp}>
              {date
                ? formatDistanceToNow(new Date(date), { addSuffix: true })
                : "3 days ago"}
            </Typography>
          )}
        </Stack>
      </Stack>
      {role && (
        <Button disableTouchRipple sx={styles.tradeButton}>
          {role.split("_").join(" ")}
        </Button>
      )}
    </Stack>
  );
};

export default UserProfileCard;
