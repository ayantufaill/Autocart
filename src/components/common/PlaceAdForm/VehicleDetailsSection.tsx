import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  // TextField,
} from "@mui/material";
// import { FastField, useFormikContext } from "formik";
// import { PlaceAdState } from "./formUtils";
import { RefObject } from "react";
// import { PreviewAdStore } from "@/pages/ads/place-ad";
// import { useAppSelector } from "@/redux/hooks";

interface VehicleDetailsSectionProps {
  inputRefs: RefObject<{ [key: string]: HTMLInputElement | null }>;
  inputStyles: React.CSSProperties;
  selects: {
    category: string;
    status: string;
    adType: string;
    mileageUnit: string;
  };
  handleSelectChange: (e: SelectChangeEvent) => void;
}

const VehicleDetailsSection: React.FC<VehicleDetailsSectionProps> = ({
  inputRefs,
  inputStyles,
  selects,
  handleSelectChange,
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
        <label htmlFor="commercial-make">Commercial Make</label>
        <input
          id="commercial-make"
          ref={(el) => {
            inputRefs.current["commercialsMake"] = el;
          }}
          placeholder="Enter Commercial Make (Honda)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="commercial-model">Commercial Model</label>
        <input
          id="commercial-model"
          ref={(el) => {
            inputRefs.current["commercialModel"] = el;
          }}
          placeholder="Enter Commercial Model (Civic)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="year-of-production">Year of Production</label>
        <input
          id="year-of-production"
          ref={(el) => {
            inputRefs.current["yearOfProduction"] = el;
          }}
          placeholder="Enter year of production (2019)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <Select
          name="status"
          id="status"
          defaultValue={""}
          value={selects.status}
          onChange={handleSelectChange}
          displayEmpty
          fullWidth
          sx={{ mt: 1 }}
        >
          <MenuItem disabled value="" sx={{ color: "#7C7C7C" }}>
            Select Status
          </MenuItem>
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="REJECTED">REJECTED</MenuItem>
          <MenuItem value="EXPIRED">EXPIRED</MenuItem>
          <MenuItem value="NEW">NEW</MenuItem>
          <MenuItem value="USED">USED</MenuItem>
        </Select>
      </div>

      {/* Ad Type */}
      <div>
        <label htmlFor="ad-type">Ad Type</label>
        <Select
          name="adType"
          id="ad-type"
          defaultValue={""}
          value={selects.adType}
          // value={adById?.adType || ad?.adType || values.adType}
          onChange={handleSelectChange}
          displayEmpty
          fullWidth
          sx={{ mt: 1 }}
        >
          <MenuItem disabled value="">
            Select Ad Type
          </MenuItem>
          <MenuItem value="SELLER">SELLER</MenuItem>
          <MenuItem value="WANTED">WANTED</MenuItem>
        </Select>
      </div>

      <div>
        <label htmlFor="engine-size">Engine size</label>
        <input
          id="engine-size"
          ref={(el) => {
            inputRefs.current["engineSize"] = el;
          }}
          placeholder="Enter Engine Size (1800)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="load-capacity">Load Capacity</label>
        <input
          id="load-capacity"
          ref={(el) => {
            inputRefs.current["loadCapacity"] = el;
          }}
          placeholder="Enter Load Capacity (e.g., 850)"
          style={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="mileage">Mileage</label>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ mt: 1, alignItems: "center" }}
        >
          <Select
            id="mileage-unit"
            name="mileageUnit"
            // defaultValue={"KM"}
            value={selects.mileageUnit}
            onChange={handleSelectChange}
            sx={{ minWidth: 120, height: "55px" }}
          >
            <MenuItem value="KM">Km</MenuItem>
            <MenuItem value="MILES">Miles</MenuItem>
          </Select>
          <input
            id="mileage"
            ref={(el) => {
              inputRefs.current["mileage"] = el;
            }}
            placeholder="Enter mileage (e.g., 1200)"
            style={{ ...inputStyles, marginTop: "-1px" }}
          />
        </Stack>
      </div>
    </>
  );
};

export default VehicleDetailsSection;
