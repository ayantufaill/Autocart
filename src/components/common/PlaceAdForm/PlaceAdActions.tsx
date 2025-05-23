import { useAppSelector } from "@/redux/hooks";
import { Button, Stack } from "@mui/material";
import { FormData, PlaceAdState } from "./formUtils";
import { useRouter } from "next/router";
import { generateImageTo64 } from "@/pages/ads/place-ad";

interface PlaceAdActionsProps {
  values: PlaceAdState;
  formData: FormData;
  isEdit?: boolean;
}

const PlaceAdActions: React.FC<PlaceAdActionsProps> = ({
  values,
  formData,
  isEdit,
}) => {
  const { loading } = useAppSelector((state) => state.ads);
  const router = useRouter();
  return (
    <Stack spacing={2}>
      <Button
        // onClick={}
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
        {isEdit ? "Update Ad" : "Place Ad"}
      </Button>
      <Button
        onClick={async () => {
          const base64AdImages = await Promise.all(
            formData.adImages.map((file) => generateImageTo64(file))
          );

          const newObj = { ...values, adImages: base64AdImages };
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
    </Stack>
  );
};

export default PlaceAdActions;
