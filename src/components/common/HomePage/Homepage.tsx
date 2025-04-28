import React from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useRouter } from "next/router";

const styles = {
  container: {
    padding: { xs: "20px", sm: "25px", md: "30px", lg: "40px" },
  },
  gridContainer: {
    py: 4,
  },
  imageContainer: {
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", xl: "row" },
  },
  imageList: {
    borderRadius: 12,
  },
  imageStack: {
    gap: 2,
    flexDirection: { xs: "row", xl: "column" },
  },
  carTitle: {
    fontSize: { xs: "16", sm: "18px", md: "20px" },
    fontWeight: 600,
    color: "#1F2937",
    my: 1,
  },
  carPrice: {
    fontSize: { xs: "24px" },
    fontWeight: 600,
    color: "#07B007",
  },
  locationText: {
    fontSize: { xs: "14px", md: "16px" },
    color: "#9CA3AF",
    display: "flex",
    gap: 1,
    my: 1,
  },
  carDescription: {
    fontSize: { xs: "12px", md: "14px" },
    color: "#9CA3AF",
    maxWidth: 480,
  },
  statText: {
    fontSize: { xs: "12px", md: "14px", lg: "16px" },
    color: "#9CA3AF",
    display: "flex",
    gap: 1,
  },
};

const Homepage = () => {
  const router = useRouter();
  const { pathname } = router;
  const stats = [
    { amount: "120", icon: "/images/likes.svg" },
    { amount: "2k", icon: "/images/view-icon.svg" },
    { amount: "2k", icon: "/images/share-icon.svg" },
  ];
  const actions = [
    { icon: "/images/call-icon.svg", alt: "call", color: "#EFF6FF" },
    { icon: "/images/message.svg", alt: "message", color: "#F0FDFA" },
    { icon: "/images/notification.svg", alt: "notification", color: "#FEF2F2" },
  ];

  return (
    <Box sx={styles.container}>
      <UserProfileCard />
      <Grid container sx={styles.gridContainer} spacing={5}>
        <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
          <ImageGallery />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between", md: "flex-start" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{ ...styles.carTitle, cursor: "pointer" }}
              onClick={() => router.push("/ads/preview-ad")}
            >
              BMW 520 M Sport
            </Typography>
            <Stack direction="row" sx={{ gap: 2 }}>
              {stats.map((item, index) => (
                <Typography sx={styles.statText} key={index}>
                  <Image
                    src={item.icon}
                    alt={item.icon}
                    width={18}
                    height={18}
                  />
                  {item.amount}
                </Typography>
              ))}
            </Stack>
          </Box>
          <Typography sx={styles.locationText}>
            <Image
              src="/images/location.svg"
              alt="location"
              width={20}
              height={20}
            />
            2614 Sweetwood Drive, Arvada, CO 80002
          </Typography>
          <Stack
            sx={{
              alignItems: "center",
              flexDirection: "row",
              gap: { xs: 2 },
              my: 2,
            }}
          >
            <Typography sx={styles.carPrice}>$20,000</Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#9CA3AF", whiteSpace: "nowrap" }}
            >
              From $430/mo
            </Typography>
            {actions.map((action, index) => (
              <IconButton
                key={index}
                size="small"
                sx={{ bgcolor: action.color, borderRadius: 1 }}
              >
                <Image
                  src={action.icon}
                  alt={action.alt}
                  width={24}
                  height={24}
                />
              </IconButton>
            ))}
          </Stack>
          <Typography sx={styles.carDescription}>
            Lorem ipsum dolor sit amet consectetur. Ullamcorper imperdiet
            fermentum mattis ut blandit mattis pretium magna.
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        {adsData.map((ad, index) => <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AdsCard key={index} adData={ad} />
        </Grid>)}
      </Grid> */}
    </Box>
  );
};

export default Homepage;
