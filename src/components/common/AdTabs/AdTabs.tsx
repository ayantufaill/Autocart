import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const AdTabs = () => {
  const router = useRouter();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // router.push(tabs[newValue].path);
    console.log(event, router );
  };
  const tabItems = [
    { title: "Active (60)" },
    { title: "Expired (20)" },
    { title: "Pending (10)" },
    { title: "Rejected (3)" },
  ];
  return (
    <Box
      sx={{
        my: 4,
        px: 2,
        minWidth: "100%",
        "& .css-s2t35c-MuiTabs-scroller": {
          overflow: "auto !important",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="email navigation tabs"
        TabIndicatorProps={{
          sx: { backgroundColor: "#07B007" },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "#9CA3AF",
            "&.Mui-selected": {
              color: "#07B007",
            },
            transition: "color 0.3s ease",
          },
        }}
      >
        {tabItems.map((tab, index) => (
          <Tab
            sx={{ fontSize: "14px" }}
            key={index}
            label={tab.title}
            disableTouchRipple
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default AdTabs;
