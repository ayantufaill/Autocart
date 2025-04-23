import React, { ReactNode } from 'react'
import Header from "@/components/core/Header/Header"
import { Box } from '@mui/material';

interface LayoutProps {
    children: ReactNode;
}

const CustomLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main>
                <Box sx={{ flex: 1 }}>{children}</Box>
            </main>
        </>
    )
}

export default CustomLayout;
