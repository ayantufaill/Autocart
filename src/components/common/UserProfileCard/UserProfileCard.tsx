import { Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const styles = {
    userInfo: {
        flexDirection: { xs: "row", sm: "row" },
        gap: 2,
        alignItems: "start",
        justifyContent: { xs: "space-between", sm: "flex-start" },
    },
    userAvatar: {
        borderRadius: "50%",
    },
    userName: {
        fontSize: { xs: "16px", md: "18px" },
        fontWeight: { xs: 500, md: 600 },
        color: "#1F2937",
    },
    userTimestamp: {
        fontSize: { xs: "12px", md: "14px" },
        color: "#9CA3AF",
    },
    tradeButton: {
        color: "#1D4ED8",
        bgcolor: "#EFF6FF",
        borderRadius: 1,
        height: 35,
        ml: { xs: 0, sm: 2 },
        mt: "7px"
    },
};

const UserProfileCard = () => {
    return (
        <Stack sx={styles.userInfo}>
            <Stack direction="row" alignItems="center" gap={2}>
                <Image
                    src={"/images/user-image.avif"}
                    alt="user-avatar"
                    width={50}
                    height={40}
                    style={styles.userAvatar}
                />
                <Stack>
                    <Typography sx={styles.userName}>Frances Swann</Typography>
                    <Typography sx={styles.userTimestamp}>12 mins ago</Typography>
                </Stack>
            </Stack>
            <Button disableTouchRipple sx={styles.tradeButton}>
                Trade Seller
            </Button>
        </Stack>
    )
}

export default UserProfileCard;
