


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,

} from "@mui/material";
   import { Stack } from "@mui/material";
import { useForm,Controller } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";


// Validation Schema
const schema = (mode) =>
  yup.object().shape({
    imageFile: yup
      .mixed()
      .test("fileExist", "Please upload a file", (value) => {
        if (mode === "edit" || mode === "view") return true;
        return value && value.length > 0;
      }),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    author: yup.string().required("Author name is required"),
  });

const BlogForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // 'edit', 'view' or null
  const isViewMode = mode === "view";
  const { id } = useParams();
  const navigate = useNavigate();
  const [tags ,setTags]=useState([]);
  const [categories ,setCategories] =useState ([]);
  const [loading, setLoading] = useState(mode === "edit" || mode === "view");
  
  const [users, setUsers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(mode)),
  });

  // Fetch authors
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));

  axios
      .get("http://localhost:3000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch users", err));

 axios
      .get("http://localhost:3000/tags")
      .then((res) => setTags(res.data))
      .catch((err) => console.error("Failed to fetch tags", err));

  }, []);

  // Fetch blog if edit/view
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      axios
        .get(`http://localhost:3000/blogs/${id}`)
        .then((res) => {
          const {title, description, author, image, tags, category} = res.data;
          setValue("title", title);
          setValue("description", description);
          setValue("author", author);
         setValue("tags", tags);           // ✅ correct
        setValue("category", category);
          setImagePreview(`http://localhost:3000${image}`); // backend se aaya hua image URL yahan set karo
        })
        .catch((err) => console.error("Failed to fetch blog:", err))
        .finally(() => setLoading(false));
    }
  }, [mode, id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.imageFile?.[0]) {
        formData.append("image", data.imageFile[0]);
      }

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("author", data.author);
      formData.append("tags", JSON.stringify(data.tags));
formData.append("category", data.category);

      let response;

      if (mode === "edit" && id) {
        response = await axios.put(
          `http://localhost:3000/blogs/${id}`,
          formData
        );
        alert("Blog updated successfully!");
      } else {
        response = await axios.post("http://localhost:3000/blogs", formData);
        alert("Blog created successfully!");
      }

      navigate("/blogs");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed!");
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="w-[90%] md:w-[60%] mx-auto mt-10">
      <Paper sx={{ p: 4,  }}>
  
          <Button
            onClick={() => navigate("/blogs")}
            className="mt-6 ml-2"
            variant="outlined"
          >
            Back
          </Button>
        <Box display="flex" justifyContent="center" mb={2}>
  <Typography variant="h5" gutterBottom>
    {mode === "edit"
      ? "Edit Blog"
      : mode === "view"
      ? "View Blog"
      : "Create Blog"}
  </Typography>
</Box>

        
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <Stack spacing={3}>
   <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 2,  // margin bottom for spacing
  }}
>
  <input
    type="file"
    {...register("imageFile")}
    disabled={isViewMode}
    accept="image/*"
    onChange={handleImageChange}
    style={{ marginBottom: '8px' }}
  />

  {errors.imageFile && (
    <Typography color="error" align="center" sx={{ mb: 1 }}>
      {errors.imageFile.message}
    </Typography>
  )}

  {imagePreview && (
    <img
      src={imagePreview}
      alt="Image Preview"
      style={{ width: "150px", borderRadius: "8px" }}
    />
  )}
</Box>

    <TextField
      label="Title"
      fullWidth
      {...register("title")}
      error={!!errors.title}
      helperText={errors.title?.message}
      disabled={isViewMode}
    />

    <TextField
      label="Description"
      fullWidth
      multiline
      rows={6}
      {...register("description")}
      error={!!errors.description}
      helperText={errors.description?.message}
      disabled={isViewMode}
    />

    <TextField
      select
      label="Author"
      fullWidth
      {...register("author")}
      error={!!errors.author}
      helperText={errors.author?.message}
      disabled={isViewMode}
    >
      {(users || []).map((user) => (
        <MenuItem key={user._id} value={user.fullName}>
          {user.fullName}
        </MenuItem>
      ))}
    </TextField>


<Controller
  name="category"
  control={control}
  rules={{ required: "Category is required" }}
  render={({ field }) => (
    <TextField
      select
      label="Select Category"
      fullWidth
      {...field}
      error={!!errors.category}
      helperText={errors.category?.message}
      disabled={isViewMode}
      InputLabelProps={{
        shrink: !!field.value, // ✅ Yeh line fix karega
      }}

    >

      {(categories).map((cat) => (
        <MenuItem key={cat._id} value={cat.categoryName}>
          {cat.categoryName}
        </MenuItem>
      ))}
    </TextField>
  )}
/>


        {/* Tags - Multi Select */}
        <Controller
  name="tags"
  control={control}
  rules={{ required: "At least one tag is required" }}
  InputLabelProps={{
    shrink: true,
  }}
  render={({ field }) => (
    <TextField
      select
      label="Select Tags"
      defaultValue={[]}
      fullWidth
      SelectProps={{ multiple: true }}
      {...field}
      error={!!errors.tags}
      helperText={errors.tags?.message}
      disabled={isViewMode}
    >
      {(tags ).map((tag) => (
  <MenuItem key={tag._id} value={tag.tagName}>
    {tag.tagName}
  </MenuItem>
))}
    </TextField>
  )}
/>

    {!isViewMode && (
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {mode === "edit" ? "Update Blog" : "Create Blog"}
      </Button>
    )}
  </Stack>
</form>

      </Paper>
    </Box>
  );
};

export default BlogForm;