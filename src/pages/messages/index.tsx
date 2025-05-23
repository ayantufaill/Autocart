import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Messages = () => {
  const messagesData = [
    {
      id: 1,
      name: "Eddie Lake",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: "30 mins ago",
      unreadCount: 2,
      isBlocked: false,
      userImage: "/images/user-image.jpeg",
      hasOptions: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      message: "Hey! Are you available for the meeting today?",
      time: "1 hour ago",
      unreadCount: 0,
      isBlocked: false,
      userImage: "/images/user-image.jpeg",
      hasOptions: true,
    },
    {
      id: 3,
      name: "Blocked User",
      message: "You won't see this if blocked logic is applied.",
      time: "Yesterday",
      unreadCount: 5,
      isBlocked: true,
      userImage: "/images/user-image.jpeg",
      hasOptions: false,
    },
  ];

  return (
    <Box sx={{ px: "16px" }}>
      {messagesData?.map((item) => (
        <MessageCard data={item} key={item.id} />
      ))}
    </Box>
  );
};

export default Messages;

interface MessageCardProps {
  data: {
    id: number;
    name: string;
    message: string;
    time: string;
    unreadCount: number;
    isBlocked: boolean;
    userImage: string;
    hasOptions: boolean;
  };
}

const MessageCard: React.FC<MessageCardProps> = ({ data }) => {
  return (
    <Stack direction={"row"} sx={{ gap: "16px" }}>
      <Image
        src={"/images/user-image.jpeg"}
        alt="user"
        width={40}
        height={40}
        style={{ borderRadius: "15px" }}
      />
      <Stack
        direction={"row"}
        sx={{
          flex: 1,
          justifyContent: "space-between",
          borderBottom: "1px solid #CACACA",
          pb: "12px",
        }}
      >
        <Stack>
          <Typography sx={{ color: "#1F2937" }}>{data?.name}</Typography>
          <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>
            {`${data?.message?.slice(0, 30)}...`}
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <Stack sx={{ alignItems: "flex-end", gap: "4px" }}>
            <Typography sx={{ color: "#9CA3AF", fontSize: "10px" }}>
              30 mins ago
            </Typography>
            <Typography
              sx={{
                bgcolor: "#07B007",
                color: "#FFF",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              2
            </Typography>
          </Stack>
          <Image
            src={"/images/three-dots.svg"}
            alt="three-dots-icon"
            width={24}
            height={24}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
