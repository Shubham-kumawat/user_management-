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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const headCells = [
  { id: "profile", label: "Profile" },
  { id: "phone", label: "Phone" },
  { id: "gender", label: "Gender " },
  { id: "dob", label: "DOB" },
  { id: "age", label: "Age" },
  { id: "city", label: "City" },
  { id: "university", label: "University" },
  { id: "personalDetails", label: "Personal Details" },
  { id: "address", label: "Address" },
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/users");
      setRows(res.data);
    };
    fetchUsers();
  }, []);

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

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleView = (id) => {
    navigate(`/form/${id}?mode=view`);
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}?mode=edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  return (
    <div>
      <div >
           <Link
              to="/"
              className=" w-40 mt-2 ml-20 block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
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
              {visibleRows.map((row, index) => {
                const id = row.id || row._id || index;
                return (
                  <TableRow key={id}>
                    <TableCell padding="none">
                      <Box display="flex" alignItems="center" gap={2}>
                        <img
                          src={`http://localhost:3000${row.filePath}`}
                          alt="profile"
                          width="50"
                          height="50"
                          className="rounded-full object-cover"
                        />
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {row.fullName}
                          </Typography>
                          <Typography variant="body2">{row.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.university}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Blood Group: {row.bloodGroup}
                      </Typography>
                      <Typography variant="body2">
                        Height: {row.height} cm
                      </Typography>
                      <Typography variant="body2">
                        Weight: {row.weight} kg
                      </Typography>
                      <Typography variant="body2">
                        Eye Color: {row.eyeColor}
                      </Typography>
                      <Typography variant="body2">
                        Hair: {row.hair?.color} / {row.hair?.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.education}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleView(id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </Button>
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
          count={rows.length}
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
