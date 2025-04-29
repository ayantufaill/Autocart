import { Box, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React from "react";

const ImageGallery = () => {
  const imagesArray = [
    { src: "/images/dp1.png" },
    { src: "/images/dp2.png" },
    { src: "/images/dp3.png" },
  ];

  return (
    <>
      <Box sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
        <Image
          src="/images/dp.png"
          alt="car-image"
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 12,
            objectFit: "cover",
          }}
        />
      </Box>
      <ImageList cols={3} gap={8} sx={{ mt: 2 }}>
        {imagesArray.map((item, index) => (
          <ImageListItem key={index}>
            <Image
              src={item.src}
              alt={`car-image-${index}`}
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default ImageGallery;
