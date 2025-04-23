import { TextField, Typography } from '@mui/material'
import React from 'react'

interface InputFieldProps {
    label?: string;
    placeholder: string;
    name: string;
    type?: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = {
    label: {
        color: "#15803D",
        mb: "2px",
        fontSize: "14px",
        fontWeight: 500
    }
}

const InputField: React.FC<InputFieldProps> = ({ type = 'text', name, label, placeholder, value, handleChange }) => {
    return (
        <>
            {label && <Typography sx={styles.label}>
                {label}
            </Typography>}
            <TextField
                fullWidth
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                variant="outlined"
                InputProps={{
                    style: { color: "#9CA3AF" },
                }}
                sx={{
                    borderRadius: 2,
                    backgroundColor: "#FFFFFF",
                    "& input::placeholder": { color: "#9CA3AF" },
                    "& fieldset": { borderColor: "#F9F9F9" },
                    "&:hover fieldset": { borderColor: "#F9F9F9 !important" },
                    // "&.Mui-focused fieldset": { borderColor: "#F9F9F9 !important" },
                }}
            />
        </>
    )
}

export default InputField;
