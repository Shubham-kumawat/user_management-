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
        value.map((option, index) => {
          const tagProps = getTagProps({ index });
          // key ko alag se nikal liya
          const { key, ...otherProps } = tagProps;
          return (
            <Chip
              key={key}              // key direct yahan pass karo
              variant="outlined"
              label={`#${option}`}
              {...otherProps}        // baki props spread karo
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Select Tags" placeholder="Add tags..." />
      )}
    />
  );
};

export default TagSelector;
