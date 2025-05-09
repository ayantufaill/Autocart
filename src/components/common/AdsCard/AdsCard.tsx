import { Ad } from "@/types/type";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import { Phone } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 2,
    maxWidth: { xs: 315, md: "100%" },
    mx: { xs: "auto", sm: 0 },
    p: 2,
    border: "1px solid #CACACA",
    ":hover": {
      boxShadow: 3,
      cursor: "pointer",
    },
  },
};

interface AdsCardProps {
  adData: Ad;
}

const AdsCard: React.FC<AdsCardProps> = ({ adData }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const handleRouteChange = () => router.push(`/ads/preview-ad/${adData?.id}`);
  const handlePhoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   console.log(new Date());
  // }, []);
  return (
    <Card onClick={handleRouteChange} sx={styles.wrapper}>
      {adData.uploadImagesForAd?.[0] &&
      adData.uploadImagesForAd?.[0] != "image1.jpg" ? (
        <CardMedia
          sx={{
            height: { xs: 160, md: 160 },
            width: { xs: "100%", md: 300 },
            objectFit: "cover",
            backgroundPosition: "center",
            borderRadius: 1,
          }}
          image={adData.uploadImagesForAd?.[0]}
          title="car-image"
        />
      ) : (
        <Stack
          sx={{
            py: 5,
            gap: 2,
            alignItems: "center",
            width: { xs: "100%", md: 300 },
            height: { xs: 160, md: 160 },
            border: "1px solid #CACACA",
            borderRadius: 1,
          }}
        >
          <CarRepairIcon sx={{ fontSize: 40, color: "#9CA3AF" }} />
          <Typography>No image available</Typography>
        </Stack>
      )}
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: 0,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "18px", md: "20px" } }}
            color="#233d7b"
          >
            {adData?.itemName}
          </Typography>
          <Typography
            variant="h6"
            component={"p"}
            fontWeight={500}
            color="#07B007"
            sx={{ fontSize: { xs: "18px", md: "20px" } }}
          >
            {adData?.priceCurrency === "EURO" ? "€" : "£"}
            {adData.price}
          </Typography>
        </Stack>
        <Typography variant="body2" color="#9CA3AF">
          {adData?.location}
        </Typography>

        <Stack
          spacing={1}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={2} mt={1}>
            {[
              adData.yearOfProduction || "N/A",
              `${adData.mileage + adData.mileageParameter}`,
              `${adData.engineSize * 1000}cc`,
            ].map((item, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: "14px",
                  pr: 2,
                  borderRight: "2px solid #CACACA",
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          <Button
            id="phone"
            disableTouchRipple
            size="small"
            variant="contained"
            sx={{ fontSize: "10px", gap: 1, color: "#FFF", bgcolor: "#07B007" }}
            onClick={handlePhoneClick}
          >
            <Phone sx={{ fontSize: "18px" }} />
            Show Phone no
          </Button>
        </Stack>
        <Popover
          onClick={(e) => e.stopPropagation()}
          id="phone"
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack spacing={1} sx={{ p: 2, width: 150, alignItems: "center" }}>
            <Typography>{adData?.user?.name}</Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ color: "#07B007" }}
              spacing={0.5}
            >
              <Phone sx={{ fontSize: "18px" }} />
              <span style={{ fontSize: "14px" }}>{adData.phoneNumber}</span>
            </Stack>
          </Stack>
        </Popover>

        {/* Uploaded Time */}
        <Typography sx={{ fontSize: "12px" }}>
          Uploaded 9 minutes ago
        </Typography>
      </CardContent>
      {/* Image count */}
      {adData.uploadImagesForAd?.length > 0 && (
        <Stack
          position={"absolute"}
          direction={"row"}
          spacing={0.5}
          sx={{
            p: "2px 12px",
            left: 16,
            bottom: { xs: 239, md: 16 },
            bgcolor: "rgba(0, 0, 0, 0.45)",
            borderBottomLeftRadius: 2,
            color: "#FFF",
            alignItems: "center",
          }}
        >
          <ImageIcon fontSize="small" />
          <span>{adData.uploadImagesForAd.length}</span>
        </Stack>
      )}
    </Card>
  );
};

export default AdsCard;
