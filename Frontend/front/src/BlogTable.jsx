import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Popover,
  FormGroup,
  FormControlLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const headCells = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "author", label: "Author" },
  { id: "category", label: "Category" },
  { id: "tags", label: "Tags" },
  { id: "createdAt", label: "Created Date" },
  { id: "updatedAt", label: "Updated Date" },
  { id: "actions", label: "Actions" },
];

export default function BlogTable() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [appliedTags, setAppliedTags] = useState([]);
  const [appliedCategories, setAppliedCategories] = useState([]);
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const openFilter = Boolean(filterAnchorEl);
  const filterPopoverId = openFilter ? "filter-popover" : undefined;

  // 🔁 Fetch Blogs (pagination + search + filters)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
     const res = await axios.get("http://localhost:3000/blogs", {
  params: {
    page: page + 1,
    limit: rowsPerPage,
    search: searchTerm,
    tags: appliedTags,
    categories: appliedCategories
  }
});
setBlogs(res.data.data);                     // ✅ correct
setTotalBlogs(res.data.pagination.total);    // ✅ correct

      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, [page, rowsPerPage, searchTerm, appliedTags, appliedCategories]);

  // 🔁 Fetch Tags & Categories
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [tagsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:3000/tags"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setAllTags(tagsRes.data);
        setAllCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setTotalBlogs((prev) => prev - 1);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleApplyFilters = () => {
    setAppliedTags(tempSelectedTags);
    setAppliedCategories(tempSelectedCategories);
    setPage(0);
    setFilterAnchorEl(null);
  };

  const handleClearFilters = () => {
    setTempSelectedTags([]);
    setTempSelectedCategories([]);
    setAppliedTags([]);
    setAppliedCategories([]);
    setPage(0);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <div>
      <Link
        to="/"
        className="w-40 mt-2 ml-20 block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
      >
        Home Page
      </Link>

      <Box className="w-[90%] mx-auto mt-12">
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
          {/* Top Controls */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <TextField
              label="Search Blogs"
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Filter">
                <IconButton onClick={handleFilterClick}>
                  <IoFilter className="text-2xl" />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/blogs/new")}
              >
                + Add Blog
              </Button>
            </Box>
          </Box>

          {/* Filter Popover */}
          <Popover
            id={filterPopoverId}
            open={openFilter}
            anchorEl={filterAnchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ p: 2, width: 300 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Filters</Typography>
                <IconButton onClick={handleFilterClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Category Filter */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Categories</Typography>
                <FormGroup>
                  {allCategories.map((cat) => (
                    <FormControlLabel
                      key={cat._id}
                      control={
                        <Checkbox
                          checked={tempSelectedCategories.includes(cat.categoryName)}
                          onChange={() => {
                            setTempSelectedCategories((prev) =>
                              prev.includes(cat.categoryName)
                                ? prev.filter((c) => c !== cat.categoryName)
                                : [...prev, cat.categoryName]
                            );
                          }}
                        />
                      }
                      label={cat.categoryName}
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* Tag Filter */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Tags</Typography>
                <FormGroup>
                  {allTags.map((tag) => (
                    <FormControlLabel
                      key={tag._id}
                      control={
                        <Checkbox
                          checked={tempSelectedTags.includes(tag.tagName)}
                          onChange={() => {
                            setTempSelectedTags((prev) =>
                              prev.includes(tag.tagName)
                                ? prev.filter((t) => t !== tag.tagName)
                                : [...prev, tag.tagName]
                            );
                          }}
                        />
                      }
                      label={tag.tagName}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button size="small" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </Box>
            </Box>
          </Popover>

          {/* Blog Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => {
                    let tags = [];
                    try {
                      tags = typeof blog.tags === "string" ? JSON.parse(blog.tags) : blog.tags;
                    } catch {
                      tags = [];
                    }

                    return (
                      <TableRow key={blog._id}>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.description}</TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>
                          {tags?.map((tag, idx) => (
                            <span key={idx} style={{ marginRight: 4 }}>
                              #{tag}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(blog.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <Button onClick={() => navigate(`/blogs/${blog._id}`)} variant="outlined" size="small">View</Button>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <Button onClick={() => navigate(`/blogs/edit/${blog._id}`)} variant="outlined" size="small" sx={{ ml: 1 }} color="primary">Edit</Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button onClick={() => handleDelete(blog._id)} variant="outlined" size="small" sx={{ ml: 1 }} color="error">Delete</Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography variant="body1">No blogs found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalBlogs}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>
    </div>
  );
}
