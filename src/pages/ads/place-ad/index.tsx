import React, { useEffect, useState } from "react";
// import React, { useEffect, useRef, useState } from "react";
// import { FastField, Formik } from "formik";
// import { MenuItem, Select, TextField } from "@mui/material";
// import VehicleDetailsSection from "@/components/common/PlaceAdForm/VehicleDetailsSection";
import {
  FormData,
  PlaceAdState,
} from "@/components/common/PlaceAdForm/formUtils";
// import AdFeatures from "@/components/common/PlaceAdForm/AdFeatures";
// import PlaceAdActions from "@/components/common/PlaceAdForm/PlaceAdActions";
// import SellerInfoSection from "@/components/common/PlaceAdForm/SellerInfoSection";
// import ImageUploadPreview from "@/components/common/PlaceAdForm/ImageUploadPreview";
// import { PostAdPayload } from "@/types/type";
import {
  fetchAdByIdThunk,
  // postAdThunk,
  // postImagesThunk,
} from "@/redux/slices/adsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PlaceAdForm, { Selects } from "./PlaceAdForm";

// import { useRouter } from "next/router";
// import { toast } from "react-toastify";

export interface PreviewAdStore extends PlaceAdState {
  adImages: File[];
  storyImages: File[];
}

export const generateImageTo64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface PlaceAdProps {
  id: string;
}

export const generateAdPayload = (
  values: { [key: string]: string },
  selects: Selects,
  adImages: string[],
  description: string
) => {
  const payload = {
    categoryId: "48d7ad8e-0e65-4d16-b1a5-6ac1fd7419e4",
    uploadImagesForAd: adImages,
    uploadImagesForStory: [
      "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTMtcC0wMDE5ZC0wMS1rc2k4YjVqbi5qcGc.jpg",
      "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
    ],

    vehicleLicenseNumber: "ABC-123",
    itemName: `${values.commercialMake || "N/A"} ${
      values.commercialModel || "N/A"
    } ${values.yearOfProduction || "N/A"}`,
    status: selects.status || "ACTIVE",
    condition: "OLD",
    adType: selects.adType || "SELLER",
    phoneNumber: values.phone || "000000000",
    location: values.location || "N/A",
    price: Number(values.price) || -1,
    priceCurrency: "EURO",

    descriptions: description || "N/A",
    commercialModel: values.commercialModel || "N/A",
    commercialsMake: values.commercialMake || "N/A",

    mileageParameter: selects.mileageUnit || "KM",
    mileage: Number(values.mileage) || 0,
    loadCapacity: Number(values.loadCapacity) || 0,
    yearOfProduction: Number(values.yearOfProduction) || 0,
    engineSize: Number(values.engineSize) || 0,
  };

  console.log("Post Ad Payload:", payload);
  return payload;
};

const PlaceAd: React.FC<PlaceAdProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [ad, setAd] = useState<PreviewAdStore | null>(null);

  const { adById } = useAppSelector((state) => state.ads);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("placeAd") || "{}");
    setAd(data);

    if (id) {
      console.log(ad);
      dispatch(fetchAdByIdThunk(id));
      console.log(
        adById?.categoryId === "09586182-8edc-4696-8ce8-f0be502e60dd" &&
          "usedCar"
      );
    }
  }, [dispatch]);

  return <PlaceAdForm />;
};

export default PlaceAd;
