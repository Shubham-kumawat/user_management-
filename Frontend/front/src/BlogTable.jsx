import * as React from "react";
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
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const headCells = [
  { id: "sno", label: "S.No." },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "author", label: "Author" },
  { id: "createdAt", label: "Created Date" },
  { id: "updatedAt", label: "Updated Date" },
  { id: "actions", label: "Actions" },
];

export default function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/blogs");
      console.log("API raw:", res.data);
      setBlogs(res.data); // <-- MISSING PART
    } catch (err) {
      console.error(err);
    }
  };
  fetchBlogs();
}, []);



  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => navigate(`/blogs/${id}?mode=view`);
  const handleEdit = (id) => navigate(`/blogs/${id}?mode=edit`);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3000/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogs.length) : 0;

  const visibleRows = blogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="w-[90%] mx-auto mt-12">
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/blogs/new")}
          >
            + Add Blog
          </Button>
        </Toolbar>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell.id}>{cell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((blog, index) => (
                <TableRow key={blog._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    {blog.description?.slice(0, 100)}...
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton onClick={() => handleView(blog._id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(blog._id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(blog._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
