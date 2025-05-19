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
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import TagSelector from "./TagSelector";
import CategorySelector from "./CategorySelector";

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

  const [loading, setLoading] = useState(mode === "edit" || mode === "view");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
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
  }, []);

  // Fetch blog if edit/view
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      axios
        .get(`http://localhost:3000/blogs/${id}`)
        .then((res) => {
          const blog = res.data;
          setValue("title", blog.title);
          setValue("description", blog.description);
          setValue("author", blog.author);
          setTags(blog.tags);
          setCategory(blog.category);

          setImagePreview(blog.image); // backend se aaya hua image URL yahan set karo
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
      formData.append("tags", JSON.stringify(tags));
      formData.append("category", category);

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
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {mode === "edit"
            ? "Edit Blog"
            : mode === "view"
            ? "View Blog"
            : "Create Blog"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="file"
            {...register("imageFile")}
            disabled={isViewMode}
            accept="image/*"
            onChange={handleImageChange}
          />

          {errors.imageFile && (
            <Typography color="error">{errors.imageFile.message}</Typography>
          )}
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "150px", borderRadius: "8px" }}
              />
            </Box>
          )}

          <TextField
            label="Title"
            fullWidth
            margin="normal"
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
            margin="normal"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isViewMode}
          />

          <TextField
            select
            label="Author"
            fullWidth
            margin="normal"
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
            disabled={isViewMode}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user.fullName}>
                {user.fullName}
              </MenuItem>
            ))}
          </TextField>

          <TagSelector value={tags} onChange={setTags} disabled={isViewMode} />

{isViewMode ? (
  <Box sx={{ mt: 2, mb: 2 }}>
    <TextField
      label="Category"
      variant="outlined"
      fullWidth
      value={category || "No category available"}
      InputProps={{
        readOnly: true,
      }}
      sx={{
        bgcolor: category ? 'background.paper' : '#f0f0f0',
        color: category ? 'text.primary' : 'text.disabled',
      }}
    />
  </Box>
) : (
  <CategorySelector
    value={category}
    onChange={setCategory}
    disabled={false}
  />
)}


          {!isViewMode && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-5"
            >
              {mode === "edit" ? "Update Blog" : "Create Blog"}
            </Button>
          )}

          <Button
            onClick={() => navigate("/blogs")}
            className="mt-6 ml-2"
            variant="outlined"
          >
            Back
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default BlogForm;
