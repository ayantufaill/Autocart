import { Badge, Card, CardContent, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react"

const styles = {
    amountBadge: {
        bgcolor: "rgba(0, 0, 0, 0.35)",
        color: "#FFF",
        height: "30px",
        width: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%"
    },
    statsStack: {
        mt: 1,
        gap: 2,
    },
    statText: {
        fontSize: "16px",
        color: "#9CA3AF",
        display: "flex",
        gap: 1,
        my: 1,
    },
    topOverlayActions: {
        position: "absolute",
        top: 3,
        width: "100%",
        justifyContent: "space-between",
        px: 2,
        py: 1,
    }
}

interface AdsCardProps {
    adData: {
        title: string,
        price: string,
        image: string,
        badgeCount: number,
        likes: string;
        views: string;
        shares: string;
    }
}

const AdsCard: React.FC<AdsCardProps> = ({ adData }) => {
    const stats = [
        { amount: adData.likes, icon: "/images/likes.svg" },
        { amount: adData.views, icon: "/images/view-icon.svg" },
        { amount: adData.shares, icon: "/images/share-icon.svg" },
    ];

    return (
        <Card sx={{ maxWidth: 315, position: "relative" }}>
            <CardMedia
                sx={{ height: 160 }}
                image={adData.image}
                title="car-image"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" color="#07B007">
                    {adData.title}
                </Typography>
                <Typography variant="body2" color='#9CA3AF'>
                    {adData.price}
                </Typography>
                <Stack direction="row" sx={styles.statsStack}>
                    {stats.map((item, index) => (
                        <Typography sx={styles.statText} key={index}>
                            <Image src={item.icon} alt={item.icon} width={18} height={18} />
                            {item.amount}
                        </Typography>
                    ))}
                </Stack>
            </CardContent>
            <Stack direction="row" sx={styles.topOverlayActions}>
                <IconButton disableTouchRipple sx={{ p: 0, }}>
                    <Image src={"/images/edit.svg"} alt="edit-icon" width={24} height={24} />
                </IconButton>
                <Badge sx={styles.amountBadge}>{adData.badgeCount}</Badge>
            </Stack>
        </Card>
    )
}

export default AdsCard;
