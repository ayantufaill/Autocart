import StatusAdsCard from "@/components/common/AdsCard/StatusAdsCard";
import { Grid } from "@mui/material";

const Likes = () => {
  return (
    <Grid spacing={2} sx={{ px: 2, pt: "24px", pb: 12 }} container>
      {Array(4)
        .fill(1)
        .map((_, index) => (
          <StatusAdsCard key={index} isLikedAd={true} />
        ))}
    </Grid>
  );
};

export default Likes;
