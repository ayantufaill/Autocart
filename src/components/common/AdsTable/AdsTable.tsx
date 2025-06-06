import React from "react";
import { useRouter } from "next/router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
} from "@mui/material";
import { Ad } from "@/types/type";
import { Delete } from "@mui/icons-material";
import { deleteAdByIdThunk } from "@/redux/slices/adsSlice";
import { useAppDispatch } from "@/redux/hooks";
interface AdsTableProps {
  ads: Ad[];
}

const AdsTable: React.FC<AdsTableProps> = ({ ads }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteAd = (id: string) => {
    dispatch(deleteAdByIdThunk(id));
  };

  return (
    <div style={{ backgroundColor: "#F9F9F9" }}>
      <TableContainer
        sx={{
          minWidth: "100%",
          width: { xs: "270px", sm: "500px", md: "700px", lg: "100%" },
          overflowX: { xs: "scroll", md: "auto" },
          mt: 2,
        }}
      >
        <Table
          stickyHeader
          sx={{ visibility: ads.length > 0 ? "visible" : "hidden" }}
        >
          <TableHead>
            <TableRow>
              {[
                "Title",
                "Price",
                "Mileage",
                "Commercial Make",
                "Commercial Model",
                "Address",
                "Year Of Production",
                "Delete Ad",
              ].map((header, index) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    backgroundColor: "#F3F4F6",
                    color: "#9CA3AF",
                    borderLeft: index === 0 ? "0px" : "0.5px solid #CACACA",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Empty Row to add gap */}
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "transparent",
                  borderBottom: "0px",
                }}
              />
            </TableRow>
            {ads.map((ad, index) => (
              <TableRow
                key={ad.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#F3F4F6",
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                {/* Title */}
                <TableCell
                  onClick={() => {
                    router.push(`/ads/preview-ad/${ad?.id}`);
                  }}
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    cursor: "pointer",
                    minWidth: "150px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{
                      ":hover": { color: "#CACACA" },
                      fontSize: { xs: "14px" },
                    }}
                  >
                    {ad?.itemName}
                  </Typography>
                </TableCell>
                {/* Price */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                    minWidth: "110px",
                  }}
                >
                  PKR {ad?.price}
                </TableCell>
                {/* Mileage */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                  }}
                >
                  <Typography>
                    {ad?.mileage + ad?.mileageParameter || "N/A"}
                  </Typography>
                </TableCell>
                {/* Make */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                  }}
                >
                  {ad?.commercialsMake || "N/A"}
                </TableCell>
                {/* Model */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                  }}
                >
                  {ad?.commercialModel || "N/A"}
                </TableCell>
                {/* Location */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                    minWidth: "150px",
                  }}
                >
                  {ad?.location || "N/A"}
                </TableCell>
                {/* Year of Production */}
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    borderLeft: "0.5px solid #CACACA",
                  }}
                >
                  {ad?.yearOfProduction || "N/A"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteAd(ad?.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdsTable;
