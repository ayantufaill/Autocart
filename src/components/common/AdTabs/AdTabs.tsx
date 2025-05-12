import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

interface AdsTabs {
  tabData: {
    title: string;
    isActive: boolean;
    color: string;
    link: string;
  }[];
  defaultTab?: number;
}

const AdTabs: React.FC<AdsTabs> = ({ tabData, defaultTab = 0 }) => {
  const router = useRouter();

  const [value, setValue] = useState(defaultTab);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // router.push(tabs[newValue].path);
    console.log(event);
  };

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
          sx: { backgroundColor: "transparent" },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "#9CA3AF",
            "&.Mui-selected": {
              color: tabData[defaultTab].color,
            },
            transition: "color 2.5s ease",
          },
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            onClick={() => router.push(tab.link)}
            sx={{
              fontSize: "14px",
              color: tab.isActive ? tab.color : "#9CA3AF",
              fontWeight: tab.isActive ? 600 : 500,
              borderBottom: `3px solid ${
                tab.isActive ? tab.color : "transparent"
              }`,
            }}
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
