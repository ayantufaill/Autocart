import {
  // IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import UploadImage from "../UploadImage/UploadImage";
import Image from "next/image";
// import { FormData } from "./formUtils";
// import { useEffect, useState } from "react";
// import { useAppSelector } from "@/redux/hooks";
// import { Ad } from "@/types/type";
import { Cancel } from "@mui/icons-material";

interface ImageUploadPreviewProps {
  images: File[];
  setImages: (data: File[]) => void;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  images,
  setImages,
}) => {
  // const { adById } = useAppSelector((state) => state.ads);
  // const [ad, setAd] = useState<Ad | null>(null);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("placeAd") || "{}");
  //   if (data?.adImages) {
  //     setAd(data);
  //     setFormData((prev: FormData) => ({ ...prev, adImages: data?.adImages }));
  //   }
  // }, [setFormData]);

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography sx={{ color: "#1F2937" }}>Upload Images</Typography>
      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
        You can upload up to 20 images
      </Typography>

      <ImageList cols={4} gap={8} sx={{ mt: 2, minHeight: "85px" }}>
        <UploadImage
          id="uploadAdImage"
          images={images}
          setImages={setImages}
        />

        {/* {adById?.uploadImagesForAd?.length &&
          adById?.uploadImagesForAd.map((item, index) => (
            <ImageListItem sx={{ width: "80px", height: "90px" }} key={item}>
              <Image
                src={item}
                alt={`car-image-${index}`}
                width={100}
                height={100}
                style={{
                  maxWidth: "100%",
                  borderRadius: 6,
                  objectFit: "cover",
                  maxHeight: "90px",
                }}
              />
            </ImageListItem>
          ))} */}

        {images &&
          images?.map((item, index) => (
            <ImageListItem
              sx={{ width: "80px", height: "90px", position: "relative" }}
              key={item.name}
            >
              <Image
                src={URL.createObjectURL(item)}
                alt={`car-image-${index}`}
                width={100}
                height={100}
                style={{
                  maxWidth: "100%",
                  borderRadius: 6,
                  objectFit: "cover",
                  maxHeight: "90px",
                }}
              />
              <Cancel
                sx={{ position: "absolute", top: 0, right: 0, color: "#FFF" }}
                fontSize="small"
                onClick={() => {
                  setImages(
                    images?.filter((image) => image?.name !== item.name)
                  );
                }}
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Stack>
  );
};

export default ImageUploadPreview;
