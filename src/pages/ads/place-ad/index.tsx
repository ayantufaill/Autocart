import UploadImage from "@/components/common/UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { postAdThunk, postImagesThunk } from "@/redux/slices/adsSlice";
import { PostAdPayload } from "@/types/type";
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface FormData {
  category: string;
  phone: string;
  location: string;
  currency: string;
  price: string;
  description: string;
  itemName: string;
  status: string;
  adType: string;
  licenseNumber: string;
  mileage: string;
  mileageUnit: string;
  motStatus: string;
  commercialMake: string;
  commercialModel: string;
  adImages: File[];
}

const VehicleForm = () => {
  const { loading } = useAppSelector(state => state.ads);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const generateAdPayload = (adImages: string[]): PostAdPayload => {
    return {
      "categoryId": "e6841936-a788-45c9-af1b-5c18b4ff31a8",
      "uploadImagesForAd": adImages,
      "uploadImagesForStory":
        [
          "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTMtcC0wMDE5ZC0wMS1rc2k4YjVqbi5qcGc.jpg",
          "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
        ],
      "vehicleLicenseNumber": formData.licenseNumber || "ABC-123",
      "itemName": formData.itemName || "Honda City",
      "status": formData.status || "ACTIVE",
      "condition": "NEW", // change to dynamic
      "adType": formData.adType || "SELLER",
      "phoneNumber": formData.phone,
      "location": formData.location || "London, UK",
      "price": Number(formData.price) || 500,
      "priceCurrency": formData.currency || "EURO",
      "descriptions": formData.description || "Brand new Honda City",
      "commercialModel": formData.commercialModel || "Transit", // change to dynamic
      "commercialsMake": formData.commercialMake || "Ford", // change to dynamic
      "mileageParameter": "KM", // change to dynamic
      "mileage": 12000, // change to dynamic
      "loadCapacity": 1500, // change to dynamic
      "yearOfProduction": 2024, // change to dynamic
      "engineSize": 1.4, // change to dynamic
    }
  }

  const vehicleCategories = [
    { label: "Used Cars", value: "cars" },
    { label: "New Cars", value: "usedCars" },
  ];

  const [formData, setFormData] = useState<FormData>({
    category: "",
    phone: "",
    location: "",
    currency: "",
    price: "",
    description: "",
    itemName: "",
    status: "",
    adType: "",
    licenseNumber: "",
    mileage: "",
    mileageUnit: "",
    motStatus: "",
    commercialMake: "",
    commercialModel: "",
    adImages: []
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    dispatch(postImagesThunk(formData.adImages))
      .unwrap()
      .then(({ urls }) => {
        if (urls.length > 0) {
          const adPayload = generateAdPayload(urls);
          dispatch(postAdThunk(adPayload))
            .unwrap()
            .then(() => {
              router.push("/");
            })
            .catch((error) => {
              toast.error(`Error posting ad: ${error.message || "Something went wrong."}`);
            });
        } else {
          toast.error("Error uploading images");
        }
      })
      .catch((error) => {
        toast.error(`Error uploading images: ${error.message || "Something went wrong."}`);
      });
  };


  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, py: 4 }}>
      {/* Category */}
      <Stack spacing={1}>
        <Typography>Category</Typography>
        <FormControl fullWidth>
          <Select
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            displayEmpty
            sx={{ color: "#9CA3AF", fontSize: "14px" }}
          >
            <MenuItem disabled value="">
              <span style={{ color: "#9CA3AF", fontSize: "14px" }}>
                Select Category
              </span>
            </MenuItem>
            {vehicleCategories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Vehicle License Number with Find Button */}
      {formData.category && (
        <Stack spacing={1}>
          <Typography>Vehicle License Number</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              sx={{ width: "60%" }}
            />
            <Button
              variant="contained"
              sx={{ width: "40%", color: "#FFF", bgcolor: "#07B007" }}
            >
              Find
            </Button>
          </Box>
        </Stack>
      )}

      {/* Item Name*/}
      {formData.category && (
        <Stack spacing={1}>
          <Typography>Item Name</Typography>
          <TextField
            label="Enter Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      )}

      {/* Status */}
      {formData.category && (
        <Stack spacing={1}>
          <Typography>Status</Typography>
          <FormControl fullWidth>
            <Select
              name="status"
              value={formData.status}
              sx={{ fontSize: "14px", color: "#9CA3AF" }}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem disabled value="">
                <span style={{ color: "#9CA3AF", fontSize: "14px" }}>
                  Select Status
                </span>
              </MenuItem>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="REJECTED">REJECTED</MenuItem>
              <MenuItem value="EXPIRED">EXPIRED</MenuItem>
              <MenuItem value="NEW">NEW</MenuItem>
              <MenuItem value="USED">USED</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {/* Ad Type */}
      {formData.category && (
        <Stack spacing={1}>
          <Typography>Ad Type</Typography>
          <FormControl fullWidth>
            <Select
              name="adType"
              value={formData.adType}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem disabled value="">
                <span style={{ color: "#9CA3AF", fontSize: "14px" }}>
                  Select Ad Type
                </span>
              </MenuItem>
              <MenuItem value="SELLER">SELLER</MenuItem>
              <MenuItem value="WANTED">WANTED</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {/* 
      {formData.category === "motorbikes" && (
        <Stack spacing={1}>
          <Typography>Mileage</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="mileage-unit-label">km</InputLabel>
              <Select
                defaultValue="km"
                labelId="mileage-unit-label"
                name="mileageUnit"
                value={formData.mileageUnit}
                onChange={handleSelectChange}
                label="Mileage Unit"
              >
                <MenuItem value="km">Km</MenuItem>
                <MenuItem value="miles">Miles</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Mileage"
              placeholder="Enter mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Box>
        </Stack>
      )}

      {formData.category === "motorbikes" && (
        <Stack spacing={1}>
          <Typography>MOT/NCT Status</Typography>
          <FormControl fullWidth>
            <InputLabel id="mot-status-label">Select status</InputLabel>
            <Select
              labelId="mot-status-label"
              name="motStatus"
              value={formData.motStatus}
              onChange={handleSelectChange}
              label="Select status"
            >
              <MenuItem value="Valid">Valid</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
              <MenuItem value="Not Required">Not Required</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
      */}

      <Stack spacing={1}>
        <Typography sx={{ color: "#1F2937" }}>Upload Images</Typography>
        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          You can upload up to 20 images
        </Typography>

        <ImageList cols={4} gap={8} sx={{ mt: 2, minHeight: "85px" }}>

          <UploadImage formData={formData} setFormData={setFormData} />
          {formData.adImages && formData.adImages.map((item, index) => (
            <ImageListItem sx={{ width: "80px", height: "90px" }} key={index}>
              <Image
                src={URL.createObjectURL(item)}
                alt={`car-image-${index}`}
                width={100}
                height={100}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 6,
                  objectFit: "cover",
                  maxHeight: "90px",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>

      {/* <Stack spacing={1}>
        <Typography sx={{ color: "#1F2937" }}>Upload Story</Typography>
        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          You can upload up to 5 Images or videos for story
        </Typography>
        <ImageList cols={4} gap={8} sx={{ mt: 2 }}>
          <ImageListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #9CA3AF",
              borderRadius: 1,
            }}
          >
            <Image
              src="/images/upload.svg"
              alt="upload image"
              width={20}
              height={20}
            />
          </ImageListItem>
          {imagesArray.map((item, index) => (
            <ImageListItem sx={{ width: "85px", height: "85px" }} key={index}>
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
      </Stack> */}

      {/* <Button
        variant="outlined"
        sx={{
          height: "48px",
          color: "#07B007",
          borderColor: "#07B007",
          borderRadius: 2,
          mt: 1,
        }}
      >
        Preview Story
      </Button> */}

      {/* Phone Number */}
      <Stack spacing={1}>
        <Typography>Phone Number</Typography>
        <TextField
          label="Input your Phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      {/* Location */}
      <Stack spacing={1}>
        <Typography sx={{ py: 0 }}>Location</Typography>
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      {/* Price */}
      <Stack spacing={1}>
        <Typography>Price</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="currency-label">€</InputLabel>
            <Select
              labelId="currency-label"
              name="currency"
              value={formData.currency}
              onChange={handleSelectChange}
              label="Currency"
            >
              <MenuItem value="POUND">£ POUND</MenuItem>
              <MenuItem value="EURO">€ EURO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
          />
        </Box>
      </Stack>

      {/* Description */}
      <Stack spacing={1}>
        <Typography>Description</Typography>
        <TextField
          label="Write Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>

      <Box sx={{ bgcolor: "#F9FAFB", p: { xs: "16px" }, borderRadius: 2 }}>
        <Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
          Ad Details
        </Typography>
        <Typography variant="body2" sx={{ color: "#9CA3AF", my: 2 }}>
          Standard Car Post
        </Typography>
        <Typography sx={{ mt: 2, fontSize: "12px", color: "#1F2937" }}>
          <span style={{ color: "#07B007", marginRight: 10 }}>✔</span>30 Days
          Car Listing
        </Typography>
        <Typography sx={{ mt: 2, fontSize: "12px", color: "#1F2937" }}>
          <span style={{ color: "#07B007", marginRight: 10 }}>✔</span>Upto 20
          Images
        </Typography>
        <Typography sx={{ mt: 2, fontSize: "12px", color: "#1F2937" }}>
          <span style={{ color: "#07B007", marginRight: 10 }}>✔</span>2x Bump up
          to the top{" "}
        </Typography>
      </Box>

      <Button
        onClick={handlePublish}
        disabled={loading ? true : false}
        variant="contained"
        sx={{
          height: "48px",
          color: "#FFF",
          bgcolor: "#07B007",
          mt: 2,
          borderRadius: 2,
        }}
      >
        Publish Ad
      </Button>
      <Button
        onClick={() => router.push("/ads/preview-ad")}
        variant="outlined"
        disabled={loading ? true : false}
        sx={{
          height: "48px",
          color: "#07B007",
          borderColor: "#07B007",
          borderRadius: 2,
        }}
      >
        Preview Ad
      </Button>
    </Box >
  );
};

export default VehicleForm;
