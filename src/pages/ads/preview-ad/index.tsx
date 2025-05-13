import React, { useState } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ImageCarousel from "@/components/common/ImageCarousel/ImageCarousel";
import PreviewAdImage from "@/components/common/PreviewAdImage/PreviewAdImage";
import { Ad } from "@/types/type";
import { getPrice } from "@/components/common/AdsCard/AdsCard";

const styles = {
  container: {},
  gridContainer: {
    pb: 8,
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

interface PreviewAdProps {
  adById: Ad;
}

const PreviewAds: React.FC<PreviewAdProps> = ({ adById }) => {
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const stats = [
    { amount: adById?.likes || "0", icon: "/images/likes.svg" },
    { amount: adById?.views || "0", icon: "/images/view-icon.svg" },
    { amount: adById?.shares || "0", icon: "/images/share-icon.svg" },
  ];
  const actions = [
    { icon: "/images/call-icon.svg", alt: "call", color: "#EFF6FF" },
    { icon: "/images/message.svg", alt: "message", color: "#F0FDFA" },
    { icon: "/images/notification.svg", alt: "notification", color: "#FEF2F2" },
  ];
  const features = [
    {
      icon: "/images/calendar.svg",
      alt: "calender",
      amount: adById?.yearOfProduction || "N/A",
    },
    {
      icon: "/images/miles.svg",
      alt: "miles",
      amount: adById?.mileage || "N/A",
    },
    {
      icon: "/images/petrol.svg",
      alt: "petrol",
      amount: adById?.mileageParameter || "N/A",
    },
    { icon: "/images/automatic.svg", alt: "automatic", amount: "Automatic" }, // change adById?.mileageParameter || "N/A"
  ];
  const details = [
    { label: "Make", description: adById?.commercialsMake || "---" },
    { label: "Model", description: adById?.commercialModel || "---" },
    { label: "Condition", description: adById?.condition || "---" }, // change
    { label: "Load capacity", description: adById?.loadCapacity || "---" }, // change
    { label: "Engine size", description: adById?.engineSize || "---" }, // change
    { label: "Trim", description: adById?.commercialsMake || "---" }, // change
  ];

  return (
    <Box sx={styles.container}>
      <Grid container sx={styles.gridContainer} spacing={5}>
        <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
          {adById ? (
            adById?.uploadImagesForAd &&
            adById?.uploadImagesForAd.length > 0 ? (
              <ImageCarousel
                images={adById?.uploadImagesForAd}
                setIsPreview={setIsPreview}
              />
            ) : (
              <Typography sx={{ textAlign: "center", pt: 2 }}>
                No Images Available
              </Typography>
            )
          ) : (
            <ImageCarousel
              images={Array(4).fill("/images/car-sale-1.webp")}
              setIsPreview={setIsPreview}
            />
          )}
        </Grid>
        <Grid
          sx={{ padding: { xs: "20px", sm: "25px", md: "30px", lg: "40px" } }}
          size={{ xs: 12, md: 6 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between", md: "flex-start" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography sx={styles.carTitle}>{`${
              adById?.itemName || "BMW 520 M Sport"
            }`}</Typography>
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
            {adById?.location || "2614 Sweetwood Drive, Arvada, CO 80002"}
          </Typography>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: { xs: 2 },
              my: 2,
            }}
          >
            <Typography sx={styles.carPrice}>
              <span style={{fontSize: "16px"}}>PKR </span>
              {` ${getPrice(adById?.price || 340000)}`}
            </Typography>
            <Stack direction={"row"} spacing={{ xs: 2 }}>
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
            {adById?.descriptions ||
              `Lorem ipsum dolor sit amet 
            consectetur. Ullamcorper imperdiet fermentum mattis ut blandit mattis pretium magna.`}
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              my: "24px",
            }}
          >
            {features.map((feature, index) => (
              <Stack
                key={index}
                sx={{
                  bgcolor: "#F9FAFB",
                  width: "76px",
                  height: "80px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: "10px" },
                  borderRadius: 2,
                }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  width={24}
                  height={24}
                />
                <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
                  {feature.amount}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Grid container rowGap={"8px"} sx={{ mt: "24px" }}>
            {details.map((detail, index) => (
              <Grid
                sx={{
                  ":nth-child(3n+2)": {
                    textAlign: "center",
                  },
                  ":nth-child(3n)": {
                    textAlign: "right",
                  },
                }}
                key={index}
                size={{ xs: 4 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#1F2937", mb: "8px" }}
                >
                  {detail.label}
                </Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>
                  {detail.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {isPreview && (
        <PreviewAdImage
          images={
            adById?.uploadImagesForAd ||
            Array(4).fill("/images/car-sale-1.webp")
          }
          setIsPreview={setIsPreview}
          isPreview={isPreview}
        />
      )}
    </Box>
  );
};

export default PreviewAds;
