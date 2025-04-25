import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

const styles = {
    sidebarConteiner: {
        bgcolor: "#F9FAFB",
        borderTop: { xs: '1px solid #e0e0e0', md: 'none' },
        height: { md: "89vh" },
        maxWidth: { md: 200, lg: 240, xl: 260 },
        pl: { xs: 1, md: 2 },
        py: { xs: 1, md: 2 },
        pr: { xs: 1, md: 0 },
        gap: 1,
    },
    sidebarWrapper: {
        flexDirection: "row",
        width: "100%",
        justifyContent: { xs: "center", md: "start" },
        alignItems: { xs: "center", md: "center" },
        gap: 2,
        py: { xs: 2, md: 2 },
        px: { md: 3 },
        borderRadius: { xs: 2, md: 0 },
        borderTopLeftRadius: { md: 14 },
        borderBottomLeftRadius: { md: 14 },
        ":hover": {
            color: "#FFF",
            bgcolor: "#07B007",
        }
    },
    text: {
        visibility: { xs: "hidden", md: "visible" },
    }
}

const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // const sidebarItems = [
    //     { icon: "/images/car.svg", label: "Cars" },
    //     { icon: "/images/search.svg", label: "Search" },
    //     { icon: "/images/scan.svg", label: "Scan" },
    //     { icon: "/images/message.svg", label: "Messages" },
    //     { icon: "/images/story.svg", label: "Story" },
    //     { icon: "/images/account.svg", label: "Account" },
    // ];

    const sidebarItems = [
        { icon: <DirectionsCarIcon />, label: "Cars" },
        { icon: <SearchIcon />, label: "Search" },
        { icon: <QrCodeScannerIcon />, label: "Scan" },
        { icon: <MessageIcon />, label: "Messages" },
        { icon: <AutoStoriesOutlinedIcon />, label: "Story" },
        { icon: <AccountBoxIcon />, label: "Account" },
    ];

    const activeIndex = 0;

    return (
        <Stack direction={{ xs: "row", md: "column" }} sx={styles.sidebarConteiner}>
            {sidebarItems.map((item, index) => (
                <Stack key={index} sx={{
                    ...styles.sidebarWrapper,
                    bgcolor: index === activeIndex ? "#07B007" : "transparent",
                    color: index === activeIndex ? "#FFF" : "#6B7280",
                }}>
                    {/* <Image src={item.icon} alt={item.label} width={40} height={40} /> */}
                    {item.icon}
                    {!isMobile && <Typography variant='body1' sx={styles.text}>
                        {item.label}
                    </Typography>}
                </Stack>
            ))}
        </Stack>
    )
}

export default Sidebar;
