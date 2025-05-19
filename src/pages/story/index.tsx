import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const Story = () => {
  const router = useRouter();
  // const [previewStory, setPreviewStory] = useState(false);
  //   const handleOpen = () => setPreviewStory(true);
  const handleOpen = () => router.push("/story/1");

  return (
    <>
      <div style={{ position: "relative" }}>
        <Box sx={{ px: "16px", py: "24px" }}>
          <StoryCard handleOpen={handleOpen} myStory={true} />
        </Box>
        <Divider />
        <Stack sx={{ gap: "36px", pt: "36px", pb: 12 }}>
          {[
            {
              title: "Trending Stories",
              icon: "/images/trending-stories.svg",
            },
            { title: "Recent Stories", icon: "/images/recent-stories.svg" },
            {
              title: "Following Stories",
              icon: "/images/following-stories.svg",
            },
          ].map((item, index) => (
            <StorySection
              handleOpen={handleOpen}
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </Stack>
      </div>
    </>
  );
};

export default Story;

interface StoryCardProps {
  myStory?: boolean;
  handleOpen: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  myStory = false,
  handleOpen,
}) => {
  return (
    <Stack
      onClick={handleOpen}
      spacing={myStory ? 4 : 2}
      direction={myStory ? "row" : "column"}
      sx={{
        alignItems: "center",
        minWidth: "90px",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          border: "2px solid red",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={"/images/car-sale-1.webp"}
          alt="story"
          height={66}
          width={66}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </Box>
      {myStory ? (
        <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
          My Story
        </Typography>
      ) : (
        <Stack sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "14px", color: "#1F2937" }}>
            Bmw motor garage sale
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>
            1 hour ago
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

interface StorySectionProps {
  title: string;
  icon: string;
  handleOpen: () => void;
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  icon,
  handleOpen,
}) => {
  return (
    <Stack spacing={4} sx={{ px: "16px" }}>
      <Stack direction={"row"} spacing={2}>
        <Image src={icon} width={20} height={20} alt={title} />
        <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
          {title}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          gap: "24px",
          alignItems: "center",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {Array(7)
          .fill(1)
          .map((_, index) => (
            <StoryCard handleOpen={handleOpen} key={index} />
          ))}
      </Box>
    </Stack>
  );
};
