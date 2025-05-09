import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import { Box, Fade, IconButton, ImageList, ImageListItem } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
// import React, { useRef, useState } from "react";
import React, { useRef} from "react";
import Slider, { Settings } from "react-slick";

const styles = {
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "rgba(0, 0, 0, 0.92)",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  arrow: {
    bgcolor: "#000",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(0%, -50%)",
    ":hover": { bgcolor: "#1A1A1A" },
    zIndex: 2000,
  },
  slideWrapper: {
    width: { xs: "70vw", md: "50vw" },
    height: { xs: "35%", md: "70%" },
  },
  imageWrapper: {
    width: "100%",
    height: { xs: 200, sm: 300, md: 400, lg: 450 },
    position: "relative",
  },
  imagesList: {
    display: "flex",
    justifyContent: "space-between",
    width: { xs: "85vw", md: "30vw" },
    "&::-webkit-scrollbar": { display: "none" },
  },
};

interface PreviewAdImage {
  isPreview: boolean;
  images: string[];
  setIsPreview: (isPreview: boolean) => void;
}

const PreviewAdImage: React.FC<PreviewAdImage> = ({
  images,
  setIsPreview,
  isPreview,
}) => {
//   const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleGoTo = (index: number) => slideRef.current?.slickGoTo(index);
  const handlePrev = () => {
    slideRef.current?.slickPrev();
  };
  const handleNext = () => slideRef.current?.slickNext();
  const handleClosePreview = () => setIsPreview(false);

  return (
    <Fade in={isPreview} timeout={300}>
      <Box sx={styles.wrapper}>
        <IconButton sx={styles.closeButton} onClick={handleClosePreview}>
          <Close sx={{ color: "#FFF" }} />
        </IconButton>

        <Box position={"relative"} sx={styles.slideWrapper}>
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{ ...styles.arrow, left: -30 }}
              >
                <ChevronLeft sx={{ color: "#9CA3AF" }} />
              </IconButton>

              <Slider ref={slideRef} {...settings}>
                {images.map((image, index) => (
                  <Box key={index} sx={styles.imageWrapper}>
                    <Image
                      src={image}
                      alt={`car-${index}`}
                      width={400}
                      height={400}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "grab",
                      }}
                    />
                  </Box>
                ))}
              </Slider>

              <IconButton
                onClick={handleNext}
                sx={{ ...styles.arrow, right: -30 }}
              >
                <ChevronRight sx={{ color: "#9CA3AF" }} />
              </IconButton>
            </>
          )}
          {images.length === 1 && (
            <Box
              sx={{
                width: "100%",
                height: { xs: 200, sm: 300, md: 400, lg: 450 },
                position: "relative",
              }}
            >
              <Image
                src={images[0]}
                alt={`car-1`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>
        <ImageList cols={4} sx={styles.imagesList}>
          {images.length > 1 &&
            images.map((image, index) => (
              <ImageListItem key={index}>
                <Image
                  onClick={() => handleGoTo(index)}
                  src={image}
                  alt="small"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </Fade>
  );
};

export default PreviewAdImage;
