// import { TextField } from "@mui/material";
// import { PlaceAdState } from "./formUtils";
// import { FastField, useFormikContext } from "formik";
import { RefObject } from "react";
// import { RefObject, useEffect, useState } from "react";
// import { PreviewAdStore } from "@/pages/ads/place-ad";
// import { useAppSelector } from "@/redux/hooks";

interface SellerInfoSectionProps {
  inputRefs: RefObject<{ [key: string]: HTMLInputElement | null }>;
  inputStyles: React.CSSProperties;
}

const SellerInfoSection: React.FC<SellerInfoSectionProps> = ({
  inputRefs,
  inputStyles,
}) => {
  // const [ad, setAd] = useState<PreviewAdStore | null>(null);
  // const { values, handleChange } = useFormikContext<PlaceAdState>();
  // const { adById } = useAppSelector((state) => state.ads);
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("placeAd") || "{}");
  //   setAd(data);
  // }, []);

  return (
    <>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          ref={(el) => {
            inputRefs.current["phoneNumber"] = el;
          }}
          placeholder="Enter Phone Number (0300-XXXXXXX)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          ref={(el) => {
            inputRefs.current["location"] = el;
          }}
          placeholder="Enter Location (Lahore)"
          style={inputStyles}
        />
      </div>
    </>
  );
};

export default SellerInfoSection;
