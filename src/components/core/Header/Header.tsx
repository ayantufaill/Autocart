import { Stack, Button } from "@mui/material";
import Image from "next/image";
import React from "react";

const styles = {
  container: {
    bgcolor: "#DCFCE7",
    p: { xs: "10px 20px", md: "20px 40px" },
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
  },
  logo: {
    width: "120px",
    height: "auto",
  },
  button: {
    color: "#9CA3AF",
    borderColor: "transparent",
  },
};

const Header = () => {
  return (
    <Stack sx={styles.container}>
      <Image
        src={"/images/autocart-logo.svg"}
        alt="autocart-logo"
        width={140}
        height={140}
        style={styles.logo}
      />

      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <Button
          sx={{
            bgcolor: "#07B007",
            color: "#FFF",
            fontSize: { xs: "12px", md: "14px" },
          }}
        >
          Place Ad +
        </Button>
        <Image
          src="/images/filter-icon.svg"
          alt="filter"
          width={24}
          height={24}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
