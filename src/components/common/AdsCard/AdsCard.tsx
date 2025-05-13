import React from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Ad } from "@/types/type";
import { useRouter } from "next/router";

export const getPrice = (price: number) => {
  if (price < 1e4) {
    return price + "";
  }
  if (price < 1e5) {
    return price / 1e3 + " Thousnad";
  } else if (price < 1e7) {
    return price / 1e5 + " Lacs";
  } else if (price < 1e9) {
    return price / 1e7 + " Crores";
  }
};

const styles = {
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
    ":hover": { color: "#253347" },
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

interface AdsCardProps {
  adData: Ad;
}

const AdsCard: React.FC<AdsCardProps> = ({ adData }) => {
  const router = useRouter();
  const stats = [
    { amount: adData?.likes || 0, icon: "/images/likes.svg" },
    { amount: adData?.views || 0, icon: "/images/view-icon.svg" },
    { amount: adData?.shares || 0, icon: "/images/share-icon.svg" },
  ];
  const actions = [
    { icon: "/images/call-icon.svg", alt: "call", color: "#EFF6FF" },
    { icon: "/images/message.svg", alt: "message", color: "#F0FDFA" },
    { icon: "/images/notification.svg", alt: "notification", color: "#FEF2F2" },
  ];

  return (
    <Box>
      <UserProfileCard
        username={adData?.user?.name}
        role={adData?.user?.role}
        date={adData?.createDate}
        id={adData?.user?.id}
      />
      <Grid container sx={styles.gridContainer} spacing={4}>
        <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
          <ImageGallery images={adData?.uploadImagesForAd} />
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
              onClick={() => router.push("/ads/preview-ad/" + adData?.id)}
              sx={styles.carTitle}
            >
              {adData?.itemName || "N/A"}
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
            {adData?.location || "N/A"}
          </Typography>
          <Stack
            sx={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: { xs: 2 },
              my: 2,
            }}
          >
            <Typography sx={styles.carPrice}>
              <span style={{ fontSize: 16 }}>PKR</span>{" "}
              {getPrice(adData?.price)}
            </Typography>
            {/* <Typography
              sx={{ fontSize: "14px", color: "#9CA3AF", whiteSpace: "nowrap" }}
            >
              From $430/mo
            </Typography> */}
            <Stack direction={"row"} spacing={4}>
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
          </Stack>
          <Typography sx={styles.carDescription}>
            {adData?.descriptions}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdsCard;
