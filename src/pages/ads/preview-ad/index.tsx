import React from 'react'
import { Box, Grid, IconButton, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import ImageCarousel from '@/components/common/ImageCarousel/ImageCarousel';
import UserProfileCard from '@/components/common/UserProfileCard/UserProfileCard';

const styles = {
    container: {
    },
    gridContainer: {
        pb: 4, // for image to be stick to header
    },
    imageContainer: {
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", xl: "row" },
    },
    imageList: {
        borderRadius: 12,
    },
    imageStack: {
        gap: 2,
        flexDirection: { xs: "row", xl: "column" },
    },
    carTitle: {
        fontSize: { xs: "16", sm: "18px", md: "20px" },
        fontWeight: 600,
        color: "#1F2937",
        my: 1,
    },
    carPrice: {
        fontSize: { xs: "24px" },
        fontWeight: 600,
        color: "#07B007",
    },
    locationText: {
        fontSize: { xs: "14px", md: "16px" },
        color: "#9CA3AF",
        display: "flex",
        gap: 1,
        my: 1,
    },
    carDescription: {
        fontSize: { xs: "12px", md: "14px" },
        color: "#9CA3AF",
        maxWidth: 480,
    },
    statText: {
        fontSize: { xs: "12px", md: "14px", lg: "16px" },
        color: "#9CA3AF",
        display: "flex",
        gap: 1,
    },
};

const index = () => {
    const stats = [
        { amount: "120", icon: "/images/likes.svg" },
        { amount: "2k", icon: "/images/view-icon.svg" },
        { amount: "2k", icon: "/images/share-icon.svg" },
    ];
    const actions = [
        { icon: "/images/call-icon.svg", alt: "call", color: "#EFF6FF" },
        { icon: "/images/message.svg", alt: "message", color: "#F0FDFA" },
        { icon: "/images/notification.svg", alt: "notification", color: "#FEF2F2" },
    ];
    const features = [
        { icon: "/images/calendar.svg", alt: "calender" },
        { icon: "/images/miles.svg", alt: "miles" },
        { icon: "/images/petrol.svg", alt: "petrol" },
        { icon: "/images/automatic.svg", alt: "automatic" },
    ];
    const details = [
        { label: "Make", description: "BMW" },
        { label: "Model", description: "520 M Sports" },
        { label: "Seats", description: "05" },
        { label: "Color", description: "White" },
        { label: "Door", description: "04" },
        { label: "Trim", description: "---" },
    ];

    return (
        <Box sx={styles.container}>
            <Grid container sx={styles.gridContainer} spacing={5}>

                <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
                    <ImageCarousel />
                </Grid>
                <Grid sx={{ padding: { xs: "20px", sm: "25px", md: "30px", lg: "40px" }, }} size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: "flex", justifyContent: { xs: "space-between", md: "flex-start" }, alignItems: "center", gap: 2 }}>
                        <Typography sx={styles.carTitle}>BMW 520 M Sport</Typography>
                        <Stack direction="row" sx={{ gap: 2 }}>
                            {stats.map((item, index) => (
                                <Typography sx={styles.statText} key={index}>
                                    <Image src={item.icon} alt={item.icon} width={18} height={18} />
                                    {item.amount}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>
                    <Typography sx={styles.locationText}>
                        <Image src='/images/location.svg' alt="location" width={20} height={20} />
                        2614 Sweetwood Drive, Arvada, CO 80002
                    </Typography>
                    <Stack sx={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", gap: { xs: 2 }, my: 2 }}>
                        <Typography sx={styles.carPrice}>$20,000</Typography>
                        <Stack direction={"row"} spacing={{ xs: 2 }}>
                            {actions.map((action, index) => <IconButton key={index} size='small' sx={{ bgcolor: action.color, borderRadius: 1 }}>
                                <Image src={action.icon} alt={action.alt} width={24} height={24} />
                            </IconButton>)}
                        </Stack>
                    </Stack>
                    <Typography sx={styles.carDescription}>
                        Lorem ipsum dolor sit amet consectetur. Ullamcorper imperdiet fermentum mattis ut blandit mattis pretium magna.
                    </Typography>
                    <Stack sx={{ flexDirection: "row", justifyContent: "space-between", my: "24px" }}>
                        {features.map((feature, index) => <Stack key={index} sx={{ bgcolor: "#F9FAFB", width: "76px", height: "80px", alignItems: "center", justifyContent: "center", gap: { xs: "10px" }, borderRadius: 2 }}>
                            <Image src={feature.icon} alt={feature.alt} width={24} height={24} />
                            <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>2024</Typography>
                        </Stack>)}
                    </Stack>
                    <Typography variant='body2' sx={{ color: "#1F2937", mb: "8px" }}>Description</Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed euismod.</Typography>

                    <Grid container rowGap={"8px"} sx={{ mt: "24px" }}>
                        {details.map((detail, index) => <Grid key={index} size={{ xs: 4 }} sx={{ textAlign: "center" }}>
                            <Typography variant='body2' sx={{ color: "#1F2937", mb: "8px" }}>{detail.label}</Typography>
                            <Typography sx={{ color: "#9CA3AF", fontSize: "12px" }}>{detail.description}</Typography>
                        </Grid>)}
                    </Grid>
                    {/* <UserProfileCard /> */}
                </Grid>
            </Grid>
        </Box>
    );
}

export default index;
