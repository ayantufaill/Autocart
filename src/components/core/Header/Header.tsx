import LoginModal from "@/components/common/LoginModal/LoginModal";
import { Stack, Button, Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react"
import SignInModal from "../../common/SignInModal/SignInModal";

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
        height: "auto"
    },
    button: {
        color: "#9CA3AF",
        borderColor: "transparent"
    },
}

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [signInModal, setSignInModal] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleSignInModalOpen = () => setSignInModal(true);
    const handleSignInModalClose = () => setSignInModal(false);

    return (
        <Stack sx={styles.container}>
            <Image
                src={"/images/autocart-logo.svg"}
                alt="autocart-logo"
                width={140}
                height={140}
                style={styles.logo}
            />
            {/* <Button onClick={handleModalOpen} disableTouchRipple variant="outlined" sx={styles.button}>Login or sign up</Button>
            <LoginModal modalOpen={modalOpen} handleModalClose={handleModalClose} handleSignInModalOpen={handleSignInModalOpen} />
            <SignInModal open={signInModal} handleSignInModalClose={handleSignInModalClose} /> */}
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
                <Button sx={{ bgcolor: "#07B007", color: "#FFF", fontSize: { xs: "12px", md: "14px" }, }}>Place Ad +</Button>
                <Image src='/images/filter-icon.svg' alt="filter" width={24} height={24} />
            </Stack>
        </Stack>
    )
}

export default Header;