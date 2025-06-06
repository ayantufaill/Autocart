import AdTabs from "@/components/common/AdTabs/AdTabs";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface FollowingCardProps {
  image: string;
  isFollowing?: boolean;
}

const Following = () => {
  return (
    <Box sx={{ px: 4 }}>
      <AdTabs
        tabData={[
          {
            title: "Following",
            color: "#07B007",
            isActive: true,
            link: "/account/following",
          },
          {
            title: "Followers",
            color: "#07B007",
            isActive: false,
            link: "/account/followers",
          },
        ]}
        defaultTab={0}
      />
      <FollowingCard image="/images/user-image.jpeg" />
    </Box>
  );
};

export default Following;

const FollowingCard: React.FC<FollowingCardProps> = ({
  image,
  isFollowing = true,
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
          Theresa Webb
        </Typography>
        <Button
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
