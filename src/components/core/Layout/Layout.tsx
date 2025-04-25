import React, { ReactNode } from 'react';
import Header from '@/components/core/Header/Header';
import { Box, Stack } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: ReactNode;
}

const styles = {
    sidebarWrapper: {
        width: { xs: '100%', md: '240px' },
        position: { xs: 'fixed', md: 'relative' },
        bottom: { xs: 0, md: 'auto' },
        left: 0,
        zIndex: 1000,
    },
    mainWrapper: {
        flex: 1,
        paddingBottom: { xs: '56px', md: 0 },
        overflowY: 'auto',
    }
}

const CustomLayout = ({ children }: LayoutProps) => {
    const router = useRouter();
    return (
        <>
            {router.pathname !== "/onboarding" && <Header />}
            <Stack direction={{ xs: "column", md: "row" }}>
                {
                    router.pathname !== "/onboarding" &&
                    <Box sx={styles.sidebarWrapper}>
                        <Sidebar />
                    </Box>
                }

                <Box sx={styles.mainWrapper}>
                    {children}
                </Box>
            </Stack>
        </>
    );
};

export default CustomLayout;
