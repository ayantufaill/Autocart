// components/InputField.tsx
import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';

type InputProps = {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    multiline?: boolean;
    rows?: number;
};

const Input: React.FC<InputProps> = ({ label, placeholder, name, value, onChange, type = 'text', multiline = false, rows = 1 }) => {
    return (
        <Stack spacing={1}>
            <Typography>{label}</Typography>
            <TextField
                label={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                fullWidth
                type={type}
                multiline={multiline}
                rows={rows}
            />
        </Stack>
    );
};

export default Input;
