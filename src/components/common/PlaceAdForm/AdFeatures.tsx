import { Box, Typography } from "@mui/material";

const AdFeatures = () => {
  return (
    <Box sx={{ bgcolor: "#F9FAFB", p: { xs: "16px" }, borderRadius: 2, mb: 2 }}>
      <Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
        Ad Details
      </Typography>
      <Typography variant="body2" sx={{ color: "#9CA3AF", my: 2 }}>
        Standard Car Post
      </Typography>
      {["30 Days Car Listing", "Upto 20 Images", "2x Bump upto the top"].map(
        (item, index) => (
          <Typography
            key={index}
            sx={{ mt: 2, fontSize: "12px", color: "#1F2937" }}
          >
            <span style={{ color: "#07B007", marginRight: 10 }}>✔</span>
            {item}
          </Typography>
        )
      )}
    </Box>
  );
};

export default AdFeatures;
