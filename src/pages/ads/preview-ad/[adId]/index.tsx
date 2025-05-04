import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAdByIdThunk } from "@/redux/slices/adsSlice";
import PreviewAds from "../index"
import { Box, CircularProgress } from "@mui/material";

const Index = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { adById, loading } = useAppSelector(state => state.ads);

    useEffect(() => {
        const id = router?.query?.adId;
        if (id && typeof (id) == "string") {
            dispatch(fetchAdByIdThunk(id));
        }
    }, [dispatch, router?.query?.adId])

    return (
        loading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
            <CircularProgress sx={{ color: "#07B007" }} />
        </Box> :
            adById && <PreviewAds adById={adById} />
    );
};

export default Index;
