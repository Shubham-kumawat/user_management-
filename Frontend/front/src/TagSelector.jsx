// import React, { useState } from "react";
// import { Autocomplete, TextField, Chip, Button } from "@mui/material";

// const predefinedTags = [
//   "technology", "reactjs", "nodejs", "education", "travel",
//   "food", "fitness", "lifestyle", "coding", "health"
// ];

// const TagSelector = () => {
//   const [value, setValue] = useState([]);

//   const saveTags = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/tags', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tags: value }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Tags saved successfully!");
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (err) {
//       alert("Failed to save tags.");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <Autocomplete
//         multiple
//         options={predefinedTags}
//         value={value}
//         onChange={(event, newValue) => setValue(newValue)}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => {
//             const tagProps = getTagProps({ index });
//             const { key, ...otherProps } = tagProps;
//             return (
//               <Chip
//                 key={key}
//                 variant="outlined"
//                 label={`#${option}`}
//                 {...otherProps}
//               />
//             );
//           })
//         }
//         renderInput={(params) => (
//           <TextField {...params} label="Select Tags" placeholder="Add tags..." />
//         )}
//       />
//       <Button onClick={saveTags} variant="contained" sx={{ mt: 2 }}>
//         Save Tags
//       </Button>
//     </div>
//   );
// };

// export default TagSelector;
// TagSelector.jsx
import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip, Button } from "@mui/material";

const predefinedTags = [
  "technology", "reactjs", "nodejs", "education", "travel",
  "food", "fitness", "lifestyle", "coding", "health"
];

const TagSelector = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const saveTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: selectedTags }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Tags saved successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert("Failed to save tags.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Select Tags (Predefined)</h3>
      <Autocomplete
        multiple
        options={predefinedTags}
        value={selectedTags}
        onChange={(event, newValue) => setSelectedTags(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={`#${option}`}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Tags" placeholder="Choose tags" />
        )}
      />
      <Button onClick={saveTags} variant="contained" sx={{ mt: 2 }}>
        Save Tags
      </Button>
    </div>
  );
};

export default TagSelector;
