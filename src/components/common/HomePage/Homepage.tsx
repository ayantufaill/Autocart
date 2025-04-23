import React from 'react'
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import AdsCard from '../AdsCard/AdsCard';

const styles = {
  container: {
    padding: "40px",
  },
  userInfo: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    alignItems: "flex-start",
  },
  userAvatar: {
    borderRadius: "50%",
  },
  userName: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1F2937",
  },
  userTimestamp: {
    fontSize: "14px",
    color: "#9CA3AF",
  },
  tradeButton: {
    color: "#1D4ED8",
    bgcolor: "#EFF6FF",
    borderRadius: 1,
    height: 35,
    ml: { xs: 0, sm: 2 },
  },
  gridContainer: {
    py: 4,
  },
  imageContainer: {
    display: "flex",
    gap: 3,
    flexDirection: { xs: "column", xl: "row" },
  },
  imageList: {
    borderRadius: 12,
  },
  imageStack: {
    flexWrap: "wrap",
    gap: 2,
    flexDirection: { xs: "row", xl: "column" },
  },
  carTitle: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#1F2937",
    mb: 1,
  },
  carPrice: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#07B007",
  },
  locationText: {
    fontSize: "16px",
    color: "#9CA3AF",
    display: "flex",
    gap: 1,
    my: 1,
  },
  carDescription: {
    fontSize: "14px",
    color: "#9CA3AF",
    maxWidth: 480,
  },
  statsStack: {
    mt: 1,
    gap: 2,
  },
  statText: {
    fontSize: "16px",
    color: "#9CA3AF",
    display: "flex",
    gap: 1,
    my: 1,
  },
};

const Homepage = () => {
  const imagesArray = [
    { src: "/images/car-image.avif" },
    { src: "/images/car-image.avif" },
    { src: "/images/car-image.avif" },
    { src: "/images/car-image.avif" }
  ];
  const stats = [
    { amount: "120", icon: "/images/likes.svg" },
    { amount: "2k", icon: "/images/view-icon.svg" },
    { amount: "2k", icon: "/images/share-icon.svg" },
  ];

  const adsData = [
    {
      title: "BMW 520 M Sport",
      price: "$350,000",
      image: "/images/car-image.avif",
      badgeCount: 12,
      likes: "120",
      views: "2k",
      shares: "2k",
    },
    {
      title: "Audi A6 S Line",
      price: "$290,000",
      image: "/images/car-image2.jpeg",
      badgeCount: 8,
      likes: "95",
      views: "1.5k",
      shares: "1.2k",
    },
    {
      title: "Tesla Model S",
      price: "$420,000",
      image: "/images/car-image.avif",
      badgeCount: 20,
      likes: "300",
      views: "3k",
      shares: "1.8k",
    },
    {
      title: "BMW 520 M Sport",
      price: "$350,000",
      image: "/images/car-image2.jpeg",
      badgeCount: 12,
      likes: "120",
      views: "2k",
      shares: "2k",
    },
    {
      title: "Audi A6 S Line",
      price: "$290,000",
      image: "/images/car-image.avif",
      badgeCount: 8,
      likes: "95",
      views: "1.5k",
      shares: "1.2k",
    },
    {
      title: "Tesla Model S",
      price: "$420,000",
      image: "/images/car-image2.jpeg",
      badgeCount: 20,
      likes: "300",
      views: "3k",
      shares: "1.8k",
    },
  ];


  return (
    <Box sx={styles.container}>
      <Box sx={styles.userInfo}>
        <Image
          src={"/images/user-image.avif"}
          alt="user-avatar"
          width={50}
          height={40}
          style={styles.userAvatar}
        />
        <Stack>
          <Typography sx={styles.userName}>Frances Swann</Typography>
          <Typography sx={styles.userTimestamp}>12 mins ago</Typography>
        </Stack>
        <Button disableTouchRipple sx={styles.tradeButton}>
          Trade Seller
        </Button>
      </Box>

      <Grid container sx={styles.gridContainer} spacing={5}>
        <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
          <Image
            src={"/images/car-image.avif"}
            alt="car-image"
            width={500}
            height={500}
            style={styles.imageList}
          />
          <Stack sx={styles.imageStack}>
            {imagesArray.map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt="car-image"
                width={100}
                height={100}
                style={{ borderRadius: 6 }}
              />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ gap: 2 }}>
          <Typography sx={styles.carTitle}>BMW 520 M Sport</Typography>
          <Typography sx={styles.carPrice}>$20,000</Typography>
          <Typography sx={styles.locationText}>
            <Image src='/images/location.svg' alt="location" width={20} height={20} />
            2614 Sweetwood Drive, Arvada, CO 80002
          </Typography>
          <Typography sx={styles.carDescription}>
            Lorem ipsum dolor sit amet consectetur. Ullamcorper imperdiet fermentum mattis ut blandit mattis pretium magna.
          </Typography>
          <Stack direction="row" sx={styles.statsStack}>
            {stats.map((item, index) => (
              <Typography sx={styles.statText} key={index}>
                <Image src={item.icon} alt={item.icon} width={18} height={18} />
                {item.amount}
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {adsData.map((ad, index) => <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AdsCard key={index} adData={ad} />
        </Grid>)}
      </Grid>
    </Box>
  );
}

export default Homepage;
