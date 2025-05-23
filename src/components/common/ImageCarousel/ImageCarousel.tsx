import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const styles = {
  arrow: {
    bgcolor: "#0005",
    position: "absolute",
    top: "50%",
    transform: "translate(0%, -50%)",
    ":hover": { bgcolor: "#0007" },
  },
};

interface ImageCarouselProps {
  images: string[];
  setIsPreview: (IsPreview: boolean) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  setIsPreview,
}) => {
  // const [activeImage, setActiveImage] = useState(0);
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slideRef = useRef<Slider>(null);
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    slideRef.current?.slickPrev();
    console.log(slideRef?.current);
  };
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    slideRef.current?.slickNext();
  };
  const filteredImages = images.filter(
    (item) => item !== "image1.jpg" && item !== "image2.jpg"
  );
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        pt: { xs: "0px", sm: "25px", md: "30px", lg: "55px" },
      }}
      onClick={() => {
        setIsPreview(true);
      }}
    >
      {filteredImages.length > 1 && (
        <>
          <Slider ref={slideRef} {...settings}>
            {filteredImages.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: 300, md: 400, lg: 450 },
                  // height: "auto",
                  position: "relative",
                }}
              >
                <Image src={item} alt={`car-${index}`} fill style={{}} />
              </Box>
            ))}
          </Slider>
          <IconButton onClick={handlePrev} sx={{ ...styles.arrow }}>
            <ChevronLeft sx={{ color: "#FFF" }} />
          </IconButton>
          <IconButton onClick={handleNext} sx={{ ...styles.arrow, right: 0 }}>
            <ChevronRight sx={{ color: "#FFF" }} />
          </IconButton>
        </>
      )}
      {filteredImages.length === 1 && (
        <Box
          sx={{
            width: "100%",
            height: { xs: 200, sm: 300, md: 400, lg: 450 },
            position: "relative",
          }}
        >
          <Image
            src={filteredImages[0]}
            alt={`car-1`}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageCarousel;
