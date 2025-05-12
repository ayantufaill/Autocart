import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { fetchAdsThunk, fetchSearchAdsThunk } from "@/redux/slices/adsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search } from "@mui/icons-material";
import AdsCard from "../AdsCard/AdsCard";
import ErrorState from "../ErrorState/ErrorState";
import Loading from "../Loading/Loading";

const styles = {
  container: {
    padding: { xs: "20px", sm: "25px", md: "30px", lg: "40px" },
  },
  gridContainer: { py: 4 },
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

const Homepage = () => {
  const [filteredAds, setFilteredAds] = useState("");
  const dispatch = useAppDispatch();
  const { ads, loading, error } = useAppSelector((state) => state.ads);

  useEffect(() => {
    if (filteredAds) {
      dispatch(fetchSearchAdsThunk({ search: filteredAds }));
    } else {
      dispatch(fetchAdsThunk(true));
    }
  }, [dispatch, filteredAds]);

  return (
    <Box sx={styles.container}>
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
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <Grid spacing={2} container sx={styles.gridContainer}>
          {error ? (
            <ErrorState error={error} />
          ) : (
            ads?.map((ad) => (
              <Grid key={ad?.id} size={{ xs: 12 }}>
                <AdsCard adData={ad} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Homepage;
