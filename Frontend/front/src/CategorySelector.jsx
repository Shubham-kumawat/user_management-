import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const categories = ["Technology", "Travel", "Education", "Health", "Lifestyle", "Food", "Business"];

const CategorySelector = ({ value, onChange, disabled }) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel>Category</InputLabel>
      <Select
        value={value || ""}
        label="Category"
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;

