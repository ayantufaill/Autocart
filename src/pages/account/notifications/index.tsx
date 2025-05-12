import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface NotificationCardProps {
  image: string;
  name: string;
  message: string;
  time: string;
}

const Notifications = () => {
  return (
    <Box>
      {[
        {
          image: "/images/user-image.jpeg",
          name: "Frances Swann",
          message: "Lorem ipsum dolor sit amet consectetur. In non sit eros.",
          time: "2:39pm",
        },
        {
          image: "/images/user-image.jpeg",
          name: "Frances Swann",
          message: "Lorem ipsum dolor sit amet consectetur. In non sit eros.",
          time: "2:39pm",
        },
        {
          image: "/images/user-image.jpeg",
          name: "Frances Swann",
          message: "Lorem ipsum dolor sit amet consectetur. In non sit eros.",
          time: "2:39pm",
        },
      ].map((item, index) => (
        <NotificationCard
          key={index}
          image={item.image}
          name={item.name}
          message={item.message}
          time={item.time}
        />
      ))}
    </Box>
  );
};

export default Notifications;

const NotificationCard: React.FC<NotificationCardProps> = ({
  image,
  name,
  message,
  time,
}) => {
  return (
    <Stack direction={"row"} spacing={4} sx={{ px: 4, my: 6 }}>
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
        spacing={2}
        sx={{
          borderBottom: "1px solid #CACACA",
          pb: "14px",
          alignItems: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography sx={{ fontSize: "14px", color: "#1F2937" }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>
            {message}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>
          {time}
        </Typography>
      </Stack>
    </Stack>
  );
};
