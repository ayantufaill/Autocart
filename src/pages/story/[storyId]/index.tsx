import { Story } from "@/redux/slices/storySlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface StoryPreviewProps {
  setIsPreview: (value: boolean) => void;
  storyData: Story;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  setIsPreview,
  storyData,
}) => {
  const styles = {
    wrapper: {
      minHeight: "100%",
      position: "relative",
    },
    progressWrapper: {
      width: "100%",
      px: 1,
      py: 2,
      position: "absolute",
      top: 0,
      left: 0,
    },
    footer: {
      position: "absolute",
      bottom: 40,
      width: "100%",
      justifyContent: "center",
      px: 1,
    },
    views: {
      width: "25%",
      height: "48px",
      bgcolor: "rgba(0, 0, 0, 0.43)",
      borderRadius: "8px",
      alignItems: "center",
      justifyContent: "center",
    },
    seeAdButton: {
      bgcolor: "#07B007",
      fontSize: "14px",
      color: "#FFF",
      width: "65%",
      textTransform: "none",
    },
  };

  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (active >= storyData?.uploadImagesForStory?.length - 1) {
            console.log("End of story");
          }
          return 0;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [setIsPreview]);

  useEffect(() => {
    if (progress >= 100) {
      setActive((prev) => {
        if (prev >= storyData?.uploadImagesForStory?.length - 1) {
          setIsPreview(false);
        }
        return prev + 1;
      });
    }
  }, [progress]);

  return (
    <Box sx={styles.wrapper} onClick={() => setProgress(100)}>
      <Image
        src={storyData?.uploadImagesForStory?.[active]}
        alt="story"
        height={66}
        width={66}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Stack sx={styles.progressWrapper} spacing={2} direction={"row"}>
        {Array(storyData?.uploadImagesForStory?.length)
          .fill(1)
          .map((_, index) => (
            <Progress
              key={index}
              value={active === index ? progress : active > index ? 100 : 0}
              width={`${100 / storyData?.uploadImagesForStory?.length}%`}
            />
          ))}
      </Stack>
      <Stack direction={"row"} spacing={5} sx={styles.footer}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push("/");
          }}
          sx={styles.seeAdButton}
        >
          See ad
        </Button>
        <Stack spacing={0.5} direction={"row"} sx={styles.views}>
          <Image src={"/images/story-view.svg"} alt="" width={24} height={24} />
          <Typography sx={{ color: "#FFF" }}>12</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StoryPreview;

interface ProgressProps {
  value: number;
  width: string;
}

const Progress: React.FC<ProgressProps> = ({ value, width }) => {
  const styles = {
    wrapper: {
      height: "5px",
      borderRadius: "5px",
      bgcolor: "#CACACA",
      position: "relative",
    },
    progressBackground: {
      height: "5px",
      borderRadius: "5px",
      bgcolor: "#07B007",
      position: "absolute",
    },
  };

  return (
    <Box sx={{ ...styles.wrapper, width: width }}>
      <Box sx={{ ...styles.progressBackground, width: `${value}%` }} />
    </Box>
  );
};
