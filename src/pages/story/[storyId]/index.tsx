import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
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
      bottom: 10,
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
  // const [hold, setHold] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // router.push("/story");
          return 0;
        }
        // if (hold) return prev;
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={styles.wrapper}
      // onMouseUp={(e) => {
      //   e.preventDefault();
      //   setHold(true);
      //   console.log("Mouse hold");
      // }}
      onClick={() => setProgress(100)}
    >
      <Image
        src={"/images/car-sale-1.webp"}
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
        <Progress value={progress} />
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

export default Index;

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  const styles = {
    wrapper: {
      height: "5px",
      borderRadius: "5px",
      width: "100%",
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
    <Box sx={styles.wrapper}>
      <Box sx={{ ...styles.progressBackground, width: `${value}%` }} />
    </Box>
  );
};
