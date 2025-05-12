import StatusAdsCard from "@/components/common/AdsCard/StatusAdsCard";
import AdTabs from "@/components/common/AdTabs/AdTabs";
import Loading from "@/components/common/Loading/Loading";
import ProfileSection from "@/components/common/ProfileSection/ProfileSection";
import { useAppSelector } from "@/redux/hooks";
import { Box, Grid } from "@mui/material";

const RejectedAds = () => {
  const { loading } = useAppSelector((state) => state.ads); // because have to read expired ads

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ pb: 12 }}>
      <ProfileSection />
      <AdTabs
      defaultTab={2}
        tabData={[
          {
            title: "Active (60)",
            isActive: false,
            color: "#07B007",
            link: "/account/active-ads",
          },
          {
            title: "Expired (20)",
            isActive: false,
            color: "#4338CA",
            link: "/account/expired-ads",
          },
          {
            title: "Pending (10)",
            isActive: true,
            color: "#A16207",
            link: "/account/pending-ads",
          },
          {
            title: "Rejected (3)",
            isActive: false,
            color: "#B91C1C",
            link: "/account/rejected-ads",
          },
        ]}
      />
      <Grid spacing={2} sx={{ px: 2 }} container>
        {Array(4)
        .fill(1)
        .map((_, index) => (
          <StatusAdsCard key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default RejectedAds;
