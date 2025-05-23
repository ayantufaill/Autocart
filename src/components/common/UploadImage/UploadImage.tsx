import { AddAPhoto } from "@mui/icons-material";
import { ImageListItem } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
// import { FormData } from "../PlaceAdForm/formUtils";

interface UploadImageProps {
  images: File[];
  setImages: (data: File[]) => void;
  id: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadImage: React.FC<UploadImageProps> = ({
  id,
  images,
  setImages,
  // handleChange,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file && images?.length < 20) {
      if (file.size > MAX_FILE_SIZE) {
        e.target.value = "";
        toast.error("File size exceeded. ");
        return;
      }
      setImages([...images, file]);
    } else {
      toast.error("You can only upload 20 images.");
    }
  };

  return (
    <>
      <ImageListItem
        component={"label"}
        sx={{
          border: "1px solid #9CA3AF",
          borderRadius: 1,
        }}
      >
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
          htmlFor={id}
        >
          <AddAPhoto sx={{ color: "#9CA3AF" }} />
        </label>
      </ImageListItem>

      <input
        id={id}
        type="file"
        hidden
        onChange={handleImageChange}
        multiple
        accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml, image/bmp, image/tiff"
      />
    </>
  );
};

export default UploadImage;
