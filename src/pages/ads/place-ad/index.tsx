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
import React, { useState } from "react";

const VehicleForm = () => {
  const vehicleCategories = [
    { label: "Used Cars", value: "cars" },
    { label: "New Cars", value: "usedCars" },
  ];

  const imagesArray = [
    { src: "/images/car-image.avif" },
    { src: "/images/car-image.avif" },
    { src: "/images/car-image.avif" },
  ];

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              <MenuItem value="new">Active</MenuItem>
              <MenuItem value="used">Pending</MenuItem>
              <MenuItem value="damaged">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {formData.category === "commercialMake" && (
        <Stack spacing={1}>
          <Typography>Van & Light Commercials Make</Typography>
          <TextField
            label="Write Van & Light Commercials Make"
            name="commercial-make"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      )}

      {formData.category === "commercialModel" && (
        <Stack spacing={1}>
          <Typography>Van & Light Commercials Model</Typography>
          <TextField
            label="Write Van & Light Commercials Model"
            name="commercial-model"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
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
              <MenuItem value="forSale">For Sale</MenuItem>
              <MenuItem value="wanted">Wanted</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

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

      <Stack spacing={1}>
        <Typography sx={{ color: "#1F2937" }}>Upload Images</Typography>
        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          You can upload up to 20 images
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
              <MenuItem value="USD">$ USD</MenuItem>
              <MenuItem value="PKR">₨ PKR</MenuItem>
              <MenuItem value="EUR">€ EUR</MenuItem>
              <MenuItem value="INR">₹ INR</MenuItem>
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
        variant="outlined"
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
  );
};

export default VehicleForm;
