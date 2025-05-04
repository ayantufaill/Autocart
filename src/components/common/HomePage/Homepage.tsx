import React, { useEffect, useState } from "react";
import { Box, CircularProgress, InputAdornment, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { fetchAdsThunk, fetchSearchAdsThunk } from "@/redux/slices/adsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search } from "@mui/icons-material";
import AdsCard from "../AdsCard/AdsCard";

const styles = {
  container: {
    padding: { xs: "20px", sm: "25px", md: "30px", lg: "40px" },
  },
  gridContainer: { py: 4, },
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

const Homepage = () => {
  const [filteredAds, setFilteredAds] = useState("");
  const dispatch = useAppDispatch();
  const { ads, loading } = useAppSelector(state => state.ads);

  useEffect(() => {
    if (filteredAds) {
      dispatch(fetchSearchAdsThunk({ search: filteredAds }))
    }
    else {
      dispatch(fetchAdsThunk());
    }
  }, [dispatch, filteredAds]);

  return (
    <Box sx={styles.container}>
      <TextField
        placeholder={"Search Ads"}
        variant="outlined"
        onChange={(e) => setFilteredAds(e.target.value)}
        value={filteredAds}
        sx={{
          fontSize: "12px",
          color: "#BFC3CB",
          marginBottom: 2,
          backgroundColor: "#F9F9F9",
          width: { xs: "100%", md: "70%" },
          maxWidth: "600px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            maxHeight: "43px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#BFC3CB" }} />
            </InputAdornment>
          ),
        }}
      />
      {
        loading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <CircularProgress sx={{ color: "#07B007" }} />
        </Box> :
          <Grid spacing={2} container sx={styles.gridContainer}>
            {ads.map(ad => (
              <Grid key={ad?.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <AdsCard adData={ad} />
              </Grid>
            ))}
          </Grid>
      }
    </Box>
  );
};

export default Homepage;
