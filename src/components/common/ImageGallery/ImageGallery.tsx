import { Box, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React from "react";

const styles = {
  mask: {
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0, 0, 0, 0.65)",
    color: "#FFF",
    position: "absolute",
    top: 0,
    borderRadius: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 600,
  },
};

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const filteredImages = images?.filter(
    (image) => image != "image1.jpg" && image != "image2.jpg"
  );

  return (
    <>
      <Box sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
        <Image
          src={filteredImages?.[0] || "/images/dp.png"}
          alt="car-image"
          width={500}
          height={500}
          style={{
            maxWidth: "100%",
            height: "auto",
            maxHeight: "220px",
            borderRadius: 12,
            objectFit: "cover",
          }}
        />
      </Box>
      <ImageList cols={3} gap={8} sx={{ mt: 0 }}>
        {filteredImages.map(
          (item, index) =>
            index < 3 && (
              <ImageListItem key={index}>
                <Image
                  src={item || "/images/dp1.png"}
                  alt={`car-image-${index}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 6,
                    objectFit: "cover",
                    aspectRatio: "4/3",
                  }}
                />
                {index === 2 && filteredImages.length > 3 && (
                  <Box sx={styles.mask}>+{filteredImages.length - 3}</Box>
                )}
              </ImageListItem>
            )
        )}
      </ImageList>
    </>
  );
};

export default ImageGallery;
