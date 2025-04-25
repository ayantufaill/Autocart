import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const index = () => {
    const [formData, setFormData] = useState({
        category: '',
        minYear: '',
        maxYear: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        currentRegCountry: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const vehicleCategories = [
        { label: "🚗 Cars", value: "cars" },
        { label: "🧰 Car Extras", value: "carExtras" },
        { label: "🏬 Dealerships", value: "dealerships" },
        { label: "⚙️ Car Parts", value: "carParts" },
        { label: "🆕 New Cars", value: "newCars" },
        { label: "🚌 Coaches and Buses", value: "coachesAndBuses" },
        { label: "🛠️ Modified Cars", value: "modifiedCars" },
        { label: "🏗️ Plant Machinery", value: "plantMachinery" },
        { label: "🧤 Motorbike Extras", value: "motorbikeExtras" },
        { label: "🚘 Vintage Cars", value: "vintageCars" },
        { label: "🏍️ Motorbikes", value: "motorbikes" },
        { label: "🔧 Breaking & Repairables", value: "breakingRepairables" },
        { label: "🏎️ Rally Cars", value: "rallyCars" },
        { label: "🛴 Scooters", value: "scooters" },
        { label: "🚚 Trucks", value: "trucks" },
        { label: "🚲 Vintage Bikes", value: "vintageBikes" },
        { label: "🚐 Campers", value: "campers" }
    ];

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, py: 4 }}>
            {/* Category */}
            <Stack spacing={1}>
                <Typography>Category</Typography>
                <FormControl fullWidth>
                    <Select
                        name="category"
                        value={formData.category}
                        onChange={handleSelectChange}
                        displayEmpty
                        sx={{ color: "#9CA3AF", fontSize: "14px" }}
                    >
                        <MenuItem disabled value="">
                            <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Select Category</span>
                        </MenuItem>
                        {vehicleCategories.map(category => (
                            <MenuItem key={category.value}
                                value={category.value}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    )
}

export default index;
