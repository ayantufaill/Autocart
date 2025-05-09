import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import {
  fetchStoriesThunk,
  fetchTrendingStoriesThunk,
} from "@/redux/slices/storySlice";
import { useAppDispatch } from "@/redux/hooks";

const ads = [
  {
    title: "BMW 520 M Sport",
    price: "$20,000",
    monthly: "From $430/mo",
    location: "Ireland",
    seller: {
      name: "Ronald Richards",
      type: "Trade Seller",
      avatar: "/images/avatar1.jpg",
    },
    image: "/images/dp.png",
  },
  {
    title: "BMW 520 M Sport",
    price: "$20,000",
    monthly: "From $430/mo",
    location: "Ireland",
    seller: {
      name: "Eleanor Pena",
      type: "Private Seller",
      avatar: "/images/avatar2.jpg",
    },
    image: "/images/car2.jpg",
  },
];
type Ad = {
  title: string;
  price: string;
  monthly: string;
  location: string;
  seller: {
    name: string;
    type: string;
    avatar: string;
  };
  image: string;
};

const AdCard = ({ ad }: { ad: Ad }) => (
  <Box sx={{ p: 1 }}>
    <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Image
        src={ad.image}
        alt={ad.title}
        width={300}
        height={180}
        style={{ width: "100%", borderRadius: 12 }}
      />
    </Box>
    <Typography variant="subtitle1" fontWeight={600} mt={1}>
      {ad.title}
    </Typography>
    <Typography variant="h6" color="green" fontWeight={600}>
      {ad.price}
    </Typography>
    <Typography variant="body2" color="gray">
      {ad.monthly}
    </Typography>
    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
      <Image
        src={ad.seller.avatar}
        alt={ad.seller.name}
        width={30}
        height={30}
        style={{ borderRadius: "50%" }}
      />
      <Box>
        <Typography fontSize="12px">{ad.seller.name}</Typography>
        <Typography fontSize="10px" color="gray">
          {ad.seller.type}
        </Typography>
      </Box>
    </Stack>
    <Typography fontSize="12px" color="gray" mt={0.5}>
      {ad.location}
    </Typography>
  </Box>
);

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStoriesThunk());
    dispatch(fetchTrendingStoriesThunk());
  }, [dispatch]);

  return (
    <Box sx={{ px: 2, pt: 4 }}>
      {/* Search Box */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ border: "1px solid #ccc", borderRadius: 2, px: 2, py: 1 }}
      >
        <SearchIcon />
        <input
          placeholder="Search for cars, trucks, car parts....."
          style={{ flex: 1, border: "none", outline: "none", fontSize: "16px" }}
        />
        <button
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
          }}
        >
          Search
        </button>
      </Stack>

      {/* Trending Section */}
      <Typography variant="h6" fontWeight={600} mt={4} mb={2}>
        Trending
      </Typography>
      <Stack direction="row" spacing={2} overflow="auto">
        {ads.map((ad, index) => (
          <AdCard ad={ad} key={index} />
        ))}
      </Stack>

      <Typography variant="h6" fontWeight={600} mt={4} mb={2}>
        New Release
      </Typography>
      <Stack direction="row" spacing={2} overflow="auto">
        {ads.map((ad, index) => (
          <AdCard ad={ad} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default HomePage;
