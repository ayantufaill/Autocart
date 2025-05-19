import AdsTable from "@/components/common/AdsTable/AdsTable";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import Loading from "@/components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAdsThunk, fetchSearchAdsThunk } from "@/redux/slices/adsSlice";
import { Search } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const styles = {
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    px: 2,
    py: 1,
    border: "1px solid #ccc",
    gap: 1,
    borderRadius: 2,
    maxWidth: "600px",
    height: "45px",
  },
  input: { outline: "none", flex: 1, fontSize: "16px", border: "none" },
};

const Index = () => {
  const [filteredAds, setFilteredAds] = useState("");
  const dispatch = useAppDispatch();
  const { ads, loading, error } = useAppSelector((state) => state.ads);

  useEffect(() => {
    if (filteredAds) {
      dispatch(fetchSearchAdsThunk({ search: filteredAds }));
    } else {
      dispatch(fetchAdsThunk(false));
    }
  }, [filteredAds, dispatch]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack sx={styles.inputWrapper}>
        <label style={{ marginTop: 4 }} htmlFor="search">
          <Search />
        </label>
        <input
          value={filteredAds}
          onChange={(e) => setFilteredAds(e.target.value)}
          id="search"
          placeholder="Search Ads"
          style={styles.input}
        />
        {/* <Button
          size="small"
          sx={{ textTransform: "none", bgcolor: "#07B007", color: "#FFF" }}
          onClick={() => {}}
        >
          Search
        </Button> */}
      </Stack>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <AdsTable ads={ads} />
      )}
    </Box>
  );
};

export default Index;
