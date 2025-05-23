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
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export interface FormData {
  adImages: File[];
  storyImages: File[];
}

const VehicleForm = () => {
  const { loading } = useAppSelector((state) => state.ads);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const generateAdPayload = (
    values: any, // change type
    adImages: string[]
  ): PostAdPayload => {
    return {
      categoryId: "e6841936-a788-45c9-af1b-5c18b4ff31a8",
      uploadImagesForAd: adImages,
      uploadImagesForStory: [
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTMtcC0wMDE5ZC0wMS1rc2k4YjVqbi5qcGc.jpg",
        "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      ],
      vehicleLicenseNumber: values.licenseNumber || "ABC-123",
      itemName:
        `${values.commercialMake} ${values.commercialModel} ${values.yearOfProduction}` ||
        "Honda City",
      status: values.status || "ACTIVE",
      condition: "OLD",
      adType: values.adType || "SELLER",
      phoneNumber: values.phone,
      location: values.location || "N/A",
      price: Number(values.price) || -1,
      priceCurrency: "EURO", // change to dynamic
      descriptions: values.description || "N/A",
      commercialModel: values.commercialModel || "N/A",
      commercialsMake: values.commercialMake || "N/A",
      mileageParameter: values.mileageUnit,
      mileage: +values.mileage,
      loadCapacity: +values.loadCapacity,
      yearOfProduction: +values.yearOfProduction,
      engineSize: +values.engineSize,
    };
  };

  const vehicleCategories = [
    { label: "Used Cars", value: "cars" },
    { label: "New Cars", value: "usedCars" },
  ];

  const [formData, setFormData] = useState<FormData>({
    adImages: [],
    storyImages: [],
  });

  const handlePublish = (values: any) => {
    dispatch(postImagesThunk(formData.adImages))
      .unwrap()
      .then(({ urls }) => {
        if (urls.length > 0) {
          const adPayload = generateAdPayload(values, urls);
          dispatch(postAdThunk(adPayload))
            .unwrap()
            .then(() => {
              router.push("/");
            })
            .catch((error) => {
              toast.error(
                `Error posting ad: ${error.message || "Something went wrong."}`
              );
            });
        } else {
          toast.error("Error uploading images");
        }
      })
      .catch((error) => {
        toast.error(
          `Error uploading images: ${error.message || "Something went wrong."}`
        );
      });
    // console.log(
    //   generateAdPayload(
    //     values,
    //     formData.adImages.map((item) => URL.createObjectURL(item))
    //   )
    // );
  };

  const initialValues = {
    category: "",
    phone: "",
    location: "",
    currency: "",
    price: "",
    description: "",
    status: "",
    adType: "",
    licenseNumber: "",
    mileage: "",
    mileageUnit: "KM",
    motStatus: "",
    commercialMake: "",
    commercialModel: "",
    yearOfProduction: "",
    engineSize: "",
    loadCapacity: "",
    adImages: [],
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      handlePublish(values);
    },
  });

  console.log(values);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 4,
          pb: 12,
        }}
      >
        {/* Category */}
        <Stack spacing={1}>
          <Typography>Category</Typography>
          <FormControl fullWidth>
            <Select
              name="category"
              value={values.category}
              onChange={handleChange}
              displayEmpty
              // sx={{ color: "#9CA3AF", fontSize: "14px" }}
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

        {values.category && (
          <>
            <Stack spacing={1}>
              <label htmlFor="commercial-make">Make</label>
              <TextField
                id="commercial-make"
                placeholder="Enter Commercial Make"
                name="commercialMake"
                value={values.commercialMake}
                onChange={handleChange}
                fullWidth
              />
            </Stack>

            <Stack spacing={1}>
              <label htmlFor="commercial-model">Model</label>
              <TextField
                id="commercial-model"
                placeholder="Enter Commercial Model"
                name="commercialModel"
                value={values.commercialModel}
                onChange={handleChange}
                fullWidth
              />
            </Stack>

            <Stack spacing={1}>
              <label htmlFor="year">Year of Production</label>
              <TextField
                id="year"
                placeholder="Enter Year of Production"
                name="yearOfProduction"
                value={values.yearOfProduction}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Stack>

            {/* Status */}
            <Stack spacing={1}>
              <Typography>Status</Typography>
              <FormControl fullWidth>
                <Select
                  name="status"
                  value={values.status}
                  // sx={{ fontSize: "14px", color: "#9CA3AF" }}
                  onChange={handleChange}
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

            {/* Ad Type */}
            <Stack spacing={1}>
              <Typography>Ad Type</Typography>
              <FormControl fullWidth>
                <Select
                  name="adType"
                  value={values.adType}
                  onChange={handleChange}
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

            <Stack spacing={1}>
              <label htmlFor="engine-size">Engine size</label>
              <TextField
                id="engine-size"
                placeholder="Enter Engine size"
                name="engineSize"
                value={values.engineSize}
                onChange={handleChange}
                fullWidth
              />
            </Stack>

            <Stack spacing={1}>
              <label htmlFor="load-capacity">Load Capacity</label>
              <TextField
                id="load-capacity"
                placeholder="Enter Load Capacity"
                name="loadCapacity"
                value={values.loadCapacity}
                onChange={handleChange}
                fullWidth
              />
            </Stack>

            <Stack spacing={1}>
              <Typography>Mileage</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    id="mileage-unit"
                    name="mileageUnit"
                    value={values.mileageUnit}
                    onChange={handleChange}
                  >
                    <MenuItem value="KM">Km</MenuItem>
                    <MenuItem value="MILES">Miles</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  placeholder="Enter mileage"
                  name="mileage"
                  value={values.mileage}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
              </Box>
            </Stack>
          </>
        )}

        {/* Upload Image for ads */}
        <Stack spacing={1}>
          <Typography sx={{ color: "#1F2937" }}>Upload Images</Typography>
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            You can upload up to 20 images
          </Typography>

          <ImageList cols={4} gap={8} sx={{ mt: 2, minHeight: "85px" }}>
            <UploadImage
              id="uploadAdImage"
              formData={formData}
              setFormData={setFormData}
              // handleChange={handleChange}
            />
            {values.adImages &&
              values.adImages.map((item, index) => (
                <ImageListItem
                  sx={{ width: "80px", height: "90px" }}
                  key={index}
                >
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

        {/* Upload image for stories */}
        {/* <Stack spacing={1}>
        <Typography sx={{ color: "#1F2937" }}>Upload Story</Typography>
        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          You can upload up to 5 Images or videos for story
        </Typography>

        <ImageList cols={4} gap={8} sx={{ mt: 2, minHeight: "85px" }}>
          <UploadImage
            id="uploadStoryImage"
            formData={formData}
            setFormData={setFormData}
          />
          {formData.storyImages &&
            formData.storyImages.map((item, index) => (
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
          <label htmlFor="phone">Phone Number</label>
          <TextField
            id="phone"
            placeholder="Input your Phone number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        {/* Location */}
        <Stack spacing={1}>
          <label htmlFor="location">Location</label>
          <TextField
            id="location"
            placeholder="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        {/* Price */}
        <Stack spacing={1}>
          <label htmlFor="price">Price (PKR)</label>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              id="price"
              placeholder="Enter price"
              name="price"
              value={values.price}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Box>
        </Stack>

        {/* Description */}
        <Stack spacing={1}>
          <label htmlFor="description">Description</label>
          <TextField
            id="description"
            placeholder="Write Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Stack>
        {/* Ads details */}
        <Box sx={{ bgcolor: "#F9FAFB", p: { xs: "16px" }, borderRadius: 2 }}>
          <Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
            Ad Details
          </Typography>
          <Typography variant="body2" sx={{ color: "#9CA3AF", my: 2 }}>
            Standard Car Post
          </Typography>
          {[
            "30 Days Car Listing",
            "Upto 20 Images",
            "2x Bump upto the top",
          ].map((item, index) => (
            <Typography
              key={index}
              sx={{ mt: 2, fontSize: "12px", color: "#1F2937" }}
            >
              <span style={{ color: "#07B007", marginRight: 10 }}>✔</span>
              {item}
            </Typography>
          ))}
        </Box>

        <Button
          onClick={handlePublish}
          type="submit"
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
      </Box>
    </form>
  );
};

export default VehicleForm;
