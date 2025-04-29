import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageCarousel() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", gap: 6, padding: 0, margin: 0 }}>
          {dots}
        </ul>
      </Box>
    ),
    customPaging: () => (
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#CACACA",
        }}
      />
    ),
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider {...settings}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: { xs: 200, sm: 300, md: 400, lg: 450 },
                position: "relative",
              }}
            >
              <Image
                src="/images/dp.png"
                alt={`car-${index}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
      </Slider>

      {/* Dot styling */}
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: #07b007 !important;
        }
      `}</style>
    </Box>
  );
}
