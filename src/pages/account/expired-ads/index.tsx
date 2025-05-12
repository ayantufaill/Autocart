import StatusAdsCard from "@/components/common/AdsCard/StatusAdsCard";
import AdTabs from "@/components/common/AdTabs/AdTabs";
import Loading from "@/components/common/Loading/Loading";
import ProfileSection from "@/components/common/ProfileSection/ProfileSection";
import { useAppSelector } from "@/redux/hooks";
import { Box, Grid } from "@mui/material";

const ExpiredAds = () => {
  const { loading } = useAppSelector((state) => state.ads); // because have to read expired ads

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ pb: 12 }}>
      <ProfileSection />
      <AdTabs
        defaultTab={1}
        tabData={[
          {
            title: "Active (60)",
            isActive: false,
            color: "#07B007",
            link: "/account/active-ads",
          },
          {
            title: "Expired (20)",
            isActive: true,
            color: "#4338CA",
            link: "/account/expired-ads",
          },
          {
            title: "Pending (10)",
            isActive: false,
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
          <StatusAdsCard key={index} status="Expired" />
        ))}
      </Grid>
    </Box>
  );
};

export default ExpiredAds;
