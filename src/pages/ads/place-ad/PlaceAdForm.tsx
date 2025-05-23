import AdFeatures from "@/components/common/PlaceAdForm/AdFeatures";
import ImageUploadPreview from "@/components/common/PlaceAdForm/ImageUploadPreview";
import SellerInfoSection from "@/components/common/PlaceAdForm/SellerInfoSection";
import VehicleDetailsSection from "@/components/common/PlaceAdForm/VehicleDetailsSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { postAdThunk, postImagesThunk } from "@/redux/slices/adsSlice";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { generateAdPayload, generateImageTo64 } from "./index";

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    padding: "0px 16px 100px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    boxSizing: "border-box",
    height: "55px",
    width: "100%",
    padding: "0px 12px",
    borderRadius: "5px",
    border: "1px solid #CACACA",
    outline: "none",
    fontSize: "16px",
    marginTop: "4px",
  },
};

// interface PlaceAdFormProps {}

export interface Selects {
  category: string;
  status: string;
  adType: string;
  mileageUnit: string;
}

// const PlaceAdForm: React.FC<PlaceAdFormProps> = ({}) => {
const PlaceAdForm = () => {
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [selects, setSelects] = useState<Selects>({
    adType: "",
    category: "",
    mileageUnit: "KM",
    status: "",
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.ads);
  const router = useRouter();

  const handlePublish = () => {
    const formData: { [key: string]: string } = {}; // get values from inputRefs
    Object.entries(inputRefs.current).forEach(([key, input]) => {
      if (input) {
        formData[key] = input.value;
      }
    });

    dispatch(postImagesThunk(images))
      .unwrap()
      .then(({ urls }) => {
        if (urls.length > 0) {
          const adPayload = generateAdPayload(
            formData,
            selects,
            urls,
            description
          );
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
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelects({ ...selects, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form style={styles.form}>
        {/* Category */}
        <div>
          <label htmlFor="category">Category</label>
          <Select
            name="category"
            id="category"
            value={selects.category}
            onChange={handleSelectChange}
            displayEmpty
            fullWidth
            sx={{ mt: 1 }}
          >
            <MenuItem disabled value="">
              Select Category
            </MenuItem>
            {[
              { label: "Used Cars", value: "usedCars" },
              { label: "New Cars", value: "newCars" },
            ].map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Make, Model, Year of production etc. */}
        <VehicleDetailsSection
          inputRefs={inputRefs}
          inputStyles={styles.input}
          selects={selects}
          handleSelectChange={handleSelectChange}
        />

        {/* Phone, Location */}
        <SellerInfoSection inputRefs={inputRefs} inputStyles={styles.input} />

        {/* Price */}
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            ref={(el) => {
              inputRefs.current["price"] = el;
            }}
            placeholder="Enter price(1200000)"
            style={styles.input}
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="descriptions">Description</label>
          <TextField
            id="descriptions"
            placeholder="Write description..."
            name="descriptions"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  border: "1px solid #C4C4C4",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #C4C4C4",
                },
              },
            }}
          />
        </div>

        {/* Ad Images */}
        <ImageUploadPreview images={images} setImages={setImages} />

        {/* Ad Features */}
        <AdFeatures />

        <Button
          disabled={loading ? true : false}
          onClick={(e) => {
            e.preventDefault();
            handlePublish();
          }}
          sx={{ height: "48px", bgcolor: "#07B007", borderRadius: 2 }}
          variant="contained"
        >
          Submit
        </Button>
        <Button
          onClick={async () => {
            const base64AdImages = await Promise.all(
              images.map((file) => generateImageTo64(file))
            );

            const formData: { [key: string]: string } = {}; // get values from inputRefs
            Object.entries(inputRefs.current).forEach(([key, input]) => {
              if (input) {
                formData[key] = input.value;
              }
            });

            const newObj = {
              ...selects,
              uploadImagesForAd: base64AdImages,
              descriptions: description,
              ...formData,
            };
            localStorage.setItem("placeAd", JSON.stringify(newObj));
            router.push("/ads/preview-ad");
          }}
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
      </form>
    </>
  );
};

export default PlaceAdForm;
