import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AddAPhoto } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { fetchUserByIdThunk } from '@/redux/slices/userSlice';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const styles = {
    container: {
        maxWidth: { xs: "100%", md: "80%" },
        mx: { xs: 0, md: "auto" },
        pb: "20px"
    },
    profileImageWrapper: {
        borderRadius: "50%",
        padding: "8px",
        border: "1px solid #07B007",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: -80,
        left: "50%",
        transform: 'translateX(-50%)',
    },
    coverImageWrapper: {
        position: "relative",
        maxHeight: { xs: "149px", md: "159px" },
        overflow: "hidden"
    },
    button: {
        backgroundColor: "#07B007",
        color: "#FFF",
        fontSize: "16px",
        width: "100%",
        mt: "48px",
        height: "48px"
    }
}
interface ProfileProps {
    edit?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ edit = false }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        address: "default",
        profileImage: "",
        coverImage: "",
    });

    const formInputs = [
        {
            label: "Enter First Name",
            name: "firstName",
            placeholder: "Enter First Name",
            value: formData.firstName,
        },
        {
            label: "Enter Last Name",
            name: "lastName",
            placeholder: "Enter Last Name",
            value: formData.lastName,
        },
        {
            label: "Enter Email",
            name: "email",
            placeholder: "Enter Email",
            value: formData.email,
        }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // const handleSelectChange = (e: SelectChangeEvent) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                e.target.value = "";
                toast.error("File size exceeded. ");
                return;
            }
            setFormData({ ...formData, [e.target.name]: URL.createObjectURL(file) })
        }
    }

    const hanldeSubmit = () => {
        if (edit) {
            return;
        }
        // change logic for edit
    }

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            dispatch(fetchUserByIdThunk(id))
                .unwrap()
                .then(userData => {
                    const [firstName, lastName] = userData?.name?.split(" ");
                    setFormData(prev => ({
                        ...prev,
                        email: userData?.email,
                        firstName: firstName,
                        lastName: lastName,
                        address: userData?.address
                    }))
                });
        }
    }, [dispatch]);

    return (
        loading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
            <CircularProgress sx={{ color: "#07B007" }} />
        </Box> : <Box sx={styles.container}>
            <Box sx={{ position: "relative" }}>
                <label htmlFor='cover-image'>
                    <Box sx={styles.coverImageWrapper}>
                        <Image
                            src={formData.coverImage || "/images/user-cover-image.svg"}
                            alt='cover-image'
                            width={200}
                            height={200}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover"
                            }}
                        />
                        {edit && !formData.coverImage && <>
                            <Box sx={{ width: "100%", height: "100%", bgcolor: "black", position: "absolute", top: 0, opacity: ".45" }} />
                            <AddAPhoto sx={{ color: "#FFF", position: "absolute", top: 20, right: 20 }} />
                        </>
                        }
                        <input type='file' id='cover-image' hidden onChange={handleImageChange} name='coverImage' />
                    </Box>
                </label>

                <label htmlFor='profile-image'>
                    <Box sx={styles.profileImageWrapper}>
                        <Image
                            src={formData.profileImage || "/images/user-image.avif"}
                            alt='user-image'
                            width={133}
                            height={133}
                            style={{
                                borderRadius: "50%"
                            }}
                        />
                        {edit && !formData.profileImage && <>
                            <Box sx={{ width: "133px", height: "133px", borderRadius: "50%", bgcolor: "black", position: "absolute", opacity: ".45" }} />
                            <AddAPhoto sx={{ color: "#FFF", position: "absolute" }} />
                            <input type='file' id='profile-image' hidden onChange={handleImageChange} name='profileImage' />
                        </>}
                    </Box>
                </label>
            </Box>
            <Box sx={{ mt: "70px", px: "16px" }}>

                {formInputs.map((input, index) => (
                    <Stack key={index} spacing={1} sx={{ mt: "24px" }}>
                        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>{input.label}</Typography>
                        <TextField
                            placeholder={input.placeholder}
                            name={input.name}
                            value={input.value}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Stack>
                ))}

                <Stack spacing={1} sx={{ mt: "24px" }}>
                    <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>Date Of Birth</Typography>
                    <TextField type='date' />
                </Stack>
                <Stack spacing={1} sx={{ mt: "24px" }}>
                    <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>Address</Typography>
                    <TextField
                        placeholder={"Address"}
                        name={"address"}
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                    />
                </Stack>
                <Button onClick={hanldeSubmit} sx={styles.button}>
                    {edit ? "Save" : "Request for my Data"}
                </Button>
            </Box>
        </Box>
    )
}

export default Profile;
