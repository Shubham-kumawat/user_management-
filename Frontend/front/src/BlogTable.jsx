// import * as React from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Toolbar,
//   TextField,
//   Typography,
//   Paper,
//   IconButton,
//   Tooltip,
//   Button,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";

// const headCells = [
//   { id: "sno", label: "S.No." },
//   { id: "title", label: "Title" },
//   { id: "description", label: "Description" },
//   { id: "author", label: "Author" },
//   { id: "tags", label: "Tags" },
//     { id: "category", label: "Category" }, 

//   { id: "createdAt", label: "Created Date" },
//   { id: "updatedAt", label: "Updated Date" },
//   { id: "actions", label: "Actions" },
// ];

// export default function BlogTable() {
//   const [blogs, setBlogs] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();

// const [searchTerm, setSearchTerm] = useState("");


// useEffect(() => {
//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/blogs");
//       console.log("API raw:", res.data);
//       setBlogs(res.data); // <-- MISSING PART
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchBlogs();
// }, []);



//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleView = (id) => navigate(`/blogs/${id}?mode=view`);
//   const handleEdit = (id) => navigate(`/blogs/${id}?mode=edit`);
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       try {
//         await axios.delete(`http://localhost:3000/blogs/${id}`);
//         setBlogs((prev) => prev.filter((blog) => blog._id !== id));
//       } catch (err) {
//         console.error("Failed to delete:", err);
//       }
//     }
//   };

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogs.length) : 0;


// const filteredBlogs = blogs.filter((blog) => {
//   const search = searchTerm.toLowerCase();
//   return (
//     blog.title.toLowerCase().includes(search) ||
//     blog.author.toLowerCase().includes(search) ||
//     blog.category?.toLowerCase().includes(search) ||
//     blog.tags?.join(" ").toLowerCase().includes(search)
//   );
// });
// const visibleRows = filteredBlogs.slice(
//   page * rowsPerPage,
//   page * rowsPerPage + rowsPerPage
// );


 

//   return (
//     <Box className="w-[90%] mx-auto mt-12">
//       <Paper sx={{ width: "100%", mb: 2, p: 2 }}>

//        <TextField
//   size="small"
//   label="Search Blogs"
//   variant="outlined"
//   value={searchTerm}
//   onChange={(e) => {
//     setSearchTerm(e.target.value);
//     setPage(0);
//   }}
//   sx={{ flexGrow: 1, marginRight: 2 }}
// />

//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Blog List
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/blogs/new")}
//           >
//             + Add Blog
//           </Button>
//         </Toolbar>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {headCells.map((cell) => (
//                   <TableCell key={cell.id}>{cell.label}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {visibleRows.map((blog, index) => (
//                 <TableRow key={blog._id}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{blog.title}</TableCell>
//                   <TableCell>
//                     {blog.description?.slice(0, 100)}...
//                   </TableCell>
//                   <TableCell>{blog.author}</TableCell>
//   <TableCell>
//   {blog.tags && blog.tags.length > 0 && blog.tags.map((tag, index) => (
//     <span key={index} style={{ marginRight: 5 }}>
//       #{tag}
//     </span>
//   ))}
// </TableCell>

// <TableCell>{blog.category || "N/A"}</TableCell>






//                   <TableCell>
//                     {new Date(blog.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(blog.updatedAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Tooltip title="View">
//                       <IconButton onClick={() => handleView(blog._id)}>
//                         <VisibilityIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => handleEdit(blog._id)}>
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => handleDelete(blog._id)}>
//                         <DeleteIcon color="error" />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                   <TableCell colSpan={7} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredBlogs.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Button,
  Popover,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  TextField
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoFilter } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router";

// Table headings
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

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [appliedTags, setAppliedTags] = useState([]);
  const [appliedCategories, setAppliedCategories] = useState([]);
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  const openFilter = Boolean(filterAnchorEl);
  const filterPopoverId = openFilter ? "filter-popover" : undefined;

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch tags and categories
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [tagsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:3000/tags"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setAllTags(tagsRes.data);
        setAllCategories(categoriesRes.data);
        setTempSelectedTags(appliedTags);
        setTempSelectedCategories(appliedCategories);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, [appliedTags, appliedCategories]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
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

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        blog.title.toLowerCase().includes(search) ||
        blog.author.toLowerCase().includes(search) ||
        blog.description.toLowerCase().includes(search);

      const matchesCategory =
        appliedCategories.length === 0 ||
        appliedCategories.includes(blog.category);

      let tags = [];
      try {
        tags = typeof blog.tags === "string" ? JSON.parse(blog.tags) : blog.tags;
        if (!Array.isArray(tags)) tags = [];
      } catch {
        tags = [];
      }

      const matchesTags =
        appliedTags.length === 0 ||
        appliedTags.some((tag) => tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [blogs, searchTerm, appliedTags, appliedCategories]);

  const visibleRows = filteredBlogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
            <IoFilter
              className="text-2xl cursor-pointer"
              onClick={handleFilterClick}
            />
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

        {/* Table */}
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
              {visibleRows.map((blog) => {
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
                      <IconButton onClick={() => navigate(`/blogs/${blog._id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => navigate(`/blogs/edit/${blog._id}`)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(blog._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {visibleRows.length === 0 && (
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
          component="div"
          count={filteredBlogs.length}
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
  );
}