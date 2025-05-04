import { Ad } from "@/types/type";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react"

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

    return (
        <Card onClick={handleRouteChange} sx={styles.wrapper}>
            <CardMedia
                sx={{ height: 160, objectFit: "cover", backgroundPosition: "center" }}
                image={adData.uploadImagesForAd[0] || "/images/car-sale-1.webp"}
                title="car-image"
            />
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
