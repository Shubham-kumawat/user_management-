import { Autocomplete, TextField, Chip } from "@mui/material";

const predefinedTags = [
  "technology", "reactjs", "nodejs", "education", "travel", 
  "food", "fitness", "lifestyle", "coding", "health"
];

const TagSelector = ({ value, onChange }) => {
  return (
    <Autocomplete
      multiple
      options={predefinedTags}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={`#${option}`} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Select Tags" placeholder="Add tags..." />
      )}
    />
  );
};

export default TagSelector;
