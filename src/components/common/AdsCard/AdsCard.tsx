import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Ad } from "@/types/type";
import { useRouter } from "next/router";
import { Check } from "@mui/icons-material";
import ShareAdModal from "./ShareModal";

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
    fontSize: { xs: "20px" },
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
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const stats = [
    // { amount: adData?.likes || 0, icon: "/images/likes.svg" },
    // { amount: adData?.views || 0, icon: "/images/view-icon.svg" },
    {
      amount: adData?.shares || 0,
      icon: "/images/share-icon.svg",
      handleClick: () => {
        setShareOpen(true);
      },
    },
  ];
  const actions = [
    {
      icon: "/images/call-icon.svg",
      alt: "call",
      color: "#EFF6FF",
      handleClick: () => copyToClipBoard(adData?.phoneNumber),
    },
    {
      icon: "/images/message.svg",
      alt: "message",
      color: "#F0FDFA",
      handleClick: () => {},
    },
    // { icon: "/images/notification.svg", alt: "notification", color: "#FEF2F2" },
  ];

  const copyToClipBoard = (phone: string) => {
    navigator.clipboard.writeText(phone);
    // toast.success()
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const action = (
    <Check sx={{ color: "#FFF", bgcolor: "#07B007", borderRadius: "50%" }} />
  );

  return (
    <Box>
      <UserProfileCard
        image={adData?.user?.profileImage}
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
                <Stack key={index} direction={"row"} alignItems={"center"}>
                  <IconButton onClick={item.handleClick}>
                    <Image
                      src={item.icon}
                      alt={item.icon}
                      width={18}
                      height={18}
                    />
                  </IconButton>
                  <Typography sx={styles.statText}>{item.amount}</Typography>
                </Stack>
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
              <span style={{ fontSize: 14 }}>PKR</span>{" "}
              {getPrice(adData?.price)}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              {actions.map((action, index) => (
                <IconButton
                  key={index}
                  size="small"
                  sx={{ bgcolor: action.color, borderRadius: 1 }}
                  onClick={action.handleClick}
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
            <Snackbar
              sx={{ width: "250px", mx: "auto" }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
              action={action}
              message="Phone number copied!"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          </Stack>
          <Typography sx={styles.carDescription}>
            {adData?.descriptions}
          </Typography>
        </Grid>
      </Grid>
      <ShareAdModal
        open={shareOpen}
        handleClose={() => {
          setShareOpen(false);
        }}
      />
    </Box>
  );
};

export default AdsCard;
