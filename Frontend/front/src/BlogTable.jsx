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
  Button,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const headCells = [
  { id: "profile", label: "Profile" },
  { id: "phone", label: "Phone" },
  { id: "gender", label: "Gender" },
  { id: "dob", label: "DOB" },
  { id: "age", label: "Age" },
  { id: "city", label: "City" },
  { id: "university", label: "University" },
  { id: "personalDetails", label: "Personal Details" },
  { id: "blogs", label: "Blogs" },
  { id: "actions", label: "Actions" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users-with-blogs", {
          params: {
            page: page + 1,
            limit: rowsPerPage
          }
        });
        setRows(res.data);
        setTotalUsers(res.data.length); // Update this if your backend returns total count
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => {
    navigate(`/form/${id}?mode=view`);
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}?mode=edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        setRows(rows.filter((row) => row._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <Link
          to="/"
          className="w-40 mt-2 ml-20 block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
          Home Page
        </Link>
      </div>

      <Box className="w-[90%] mx-auto h-[600px] mt-20 overflow-auto">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">User Details</Typography>
            <Link
              to="/form"
              className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              + Add User
            </Link>
          </Toolbar>

          <TableContainer>
            <Table size={dense ? "small" : "medium"}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row) => {
                  const id = row._id;

                  return (
                    <TableRow hover key={id}>
                      {/* Profile Cell */}
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <img
                            src={`http://localhost:3000${row.filePath}`}
                            alt="profile"
                            width="50"
                            height="50"
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <Box>
                            <Typography fontWeight="bold">{row.fullName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Basic Info Cells */}
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>
                        {row.dob ? new Date(row.dob).toLocaleDateString() : ''}
                      </TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.university}</TableCell>

                      {/* Personal Details Cell */}
                      <TableCell>
                        <Box>
                          <Typography variant="body2">Blood: {row.bloodGroup}</Typography>
                          <Typography variant="body2">Height: {row.height}cm</Typography>
                          <Typography variant="body2">Weight: {row.weight}kg</Typography>
                        </Box>
                      </TableCell>

                      {/* Blogs Cell - This is the important part */}
                      <TableCell sx={{ maxWidth: 200 }}>
                        {row.blogs && row.blogs.length > 0 ? (
                          <Box>
                            {row.blogs.slice(0, 3).map((blog) => (
                              <Tooltip key={blog._id} title={blog.title}>
                                <Typography 
                                  variant="body2" 
                                  sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' }
                                  }}
                                  onClick={() => navigate(`/blogs/${blog._id}`)}
                                >
                                  • {blog.title}
                                </Typography>
                              </Tooltip>
                            ))}
                            {row.blogs.length > 3 && (
                              <Typography variant="caption">
                                +{row.blogs.length - 3} more
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No blogs
                          </Typography>
                        )}
                      </TableCell>

                      {/* Actions Cell */}
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleView(id)}
                            >
                              View
                            </Button>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(id)}
                            >
                              Edit
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() => handleDelete(id)}
                            >
                              Delete
                            </Button>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}