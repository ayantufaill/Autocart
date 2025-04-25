import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const onBoarding = () => {
    return (
        <>
            <Box>
                <Typography variant='h5' sx={{ fontWeight: 600 }}>User Account Type</Typography>
                <Typography>Private Seller</Typography>
                <Typography>🚗 Perfect for Individual Sellers Designed for individuals looking to sell their cars, parts, or post wanted ads.</Typography>
                <Typography>✅ Simple Setup Easy sign-up process with minimal information required.</Typography>
                <Typography>📢 Post Flexibly Post both wanted ads and private car sales without any restrictions.</Typography>
                <Typography>💰 No Finance Requirement No mandatory finance price input for your listings.</Typography>
            </Box>
            <Box>
                <Button>Start selling Now</Button>
                <Typography>Already have an account? <Link href={"/"}>Login</Link></Typography>
            </Box>
        </>
    )
}

export default onBoarding;
