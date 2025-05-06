import { Ad } from "@/types/type";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react"
import CarRepairIcon from '@mui/icons-material/CarRepair';

const styles = {
    wrapper: {
        maxWidth: 315,
        mx: { xs: "auto", sm: 0 },
        ":hover": {
            boxShadow: 5,
            cursor: "pointer"
        }
    }
}

interface AdsCardProps {
    adData: Ad
}

const AdsCard: React.FC<AdsCardProps> = ({ adData }) => {
    const router = useRouter();
    const handleRouteChange = () => router.push(`/ads/preview-ad/${adData?.id}`);

    console.log(adData.uploadImagesForAd?.[0]);

    return (
        <Card onClick={handleRouteChange} sx={styles.wrapper}>
            {
                adData.uploadImagesForAd?.[0] && adData.uploadImagesForAd?.[0] != "image1.jpg" ? <CardMedia
                    sx={{ height: 160, objectFit: "cover", backgroundPosition: "center" }}
                    image={adData.uploadImagesForAd?.[0]}
                    title="car-image"
                />
                    : <Stack sx={{ py: 5, gap: 2, alignItems: "center" }}>
                        <CarRepairIcon sx={{ fontSize: 40, color: "#9CA3AF" }} />
                        <Typography>No image available</Typography>
                    </Stack>
            }
            <CardContent>
                <Typography variant="h6" color="#233d7b">
                    {adData?.itemName}
                </Typography>
                <Typography variant="body1" fontWeight={500} color='#07B007' my={.5}>
                    {adData?.priceCurrency === "EURO" ? "€" : "£"}
                    {adData.price}
                </Typography>
                <Typography variant="body2" color='#9CA3AF'>
                    {adData?.location}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AdsCard;
