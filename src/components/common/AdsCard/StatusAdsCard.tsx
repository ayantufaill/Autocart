import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Add } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Ad } from "@/types/type";
import { getPrice } from "./AdsCard";
import { useRouter } from "next/router";

interface StatusAdsCardProps {
  status?: string;
  isLikedAd?: boolean;
  data: Ad;
}

const StatusAdsCard: React.FC<StatusAdsCardProps> = ({
  status = "Active",
  isLikedAd,
  data,
}) => {
  const router = useRouter();

  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }} sx={{ position: "relative" }}>
      <Card sx={{ boxShadow: 0, border: "1px solid #9CA3AF" }}>
        {/* <CardMedia image="/images/car-sale.webp" /> */}
        <Image
          src={data?.uploadImagesForAd?.[0] || "/images/car-sale-1.webp"}
          alt="ad-image"
          width={200}
          height={200}
          style={{
            width: "100%",
            maxHeight: "150px",
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: isLikedAd ? "#1F2937" : "#07B007",
              }}
            >
              {data?.commercialsMake +
                " " +
                data?.commercialModel +
                " " +
                data?.yearOfProduction || "Honda City"}
            </Typography>
            {isLikedAd && <FavoriteIcon fontSize="small" color="error" />}
          </Stack>
          <Typography sx={{ fontSize: "14px", color: "#9CA3AF" }}>
            {getPrice(data?.price)}
          </Typography>
          {status === "Expired" ? (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography sx={{ color: "#4338CA", fontSize: "10px" }}>
                Days since expired:
              </Typography>
              <Typography sx={{ color: "#4338CA", fontSize: "10px" }}>
                14 Days
              </Typography>
            </Stack>
          ) : isLikedAd ? (
            <>
              <UserProfile />
            </>
          ) : (
            <Stack direction={"row"} spacing={2}>
              {/* {[
                { icon: "/images/likes.svg", count: "10" },
                { icon: "/images/view-icon.svg", count: "23" },
                { icon: "/images/share-icon.svg", count: "21" },
              ].map((item, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  sx={{ alignItems: "center", gap: "3px" }}
                >
                  <Image
                    src={item.icon}
                    alt={item.icon}
                    width={14}
                    height={14}
                  />
                  <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>
                    {item.count}
                  </Typography>
                </Stack>
              ))} */}
            </Stack>
          )}
        </CardContent>
        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            top: 8,
            px: 2,
            width: "100%",
            justifyContent: isLikedAd ? "flex-end" : "space-between",
          }}
        >
          <Image
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/ads/edit-ad/${data?.id}`);
            }}
            src={"/images/edit.svg"}
            alt="edit-icon"
            width={25}
            height={25}
            style={{
              backgroundColor: "#2C2C2C",
              borderRadius: "50%",
              padding: "3px",
            }}
          />
          {/* <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "rgba(0, 0, 0, 0.35)",
              color: "#FFF",
              fontSize: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            12
          </Box> */}
        </Stack>
      </Card>
    </Grid>
  );
};

export default StatusAdsCard;

const UserProfile = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Box
        sx={{
          p: "2px",
          border: "1px solid #07B007",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          src={"/images/user-image.avif"}
          alt="user-avatar"
          width={25}
          height={25}
          style={{ borderRadius: "50%" }}
        />
        <Add
          sx={{
            bgcolor: "#F3F4F6",
            width: "10px",
            height: "10px",
            color: "red",
            position: "absolute",
            bottom: 0,
            right: 0,
            borderRadius: "50%",
          }}
        />
      </Box>
      <Stack>
        <Stack>
          {/* <Image /> */}
          <Typography sx={{ fontSize: "10px", color: "#1F2937" }}>
            Esther Howard
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: "8px", color: "#9CA3AF" }}>
          3 days ago
        </Typography>
      </Stack>
    </Stack>
  );
};
