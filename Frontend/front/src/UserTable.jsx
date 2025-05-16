

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const headCells = [
  { id: "profile", label: "Profile" },
  { id: "phone", label: "Phone" },
  { id: "gender", label: "Gender M/F/O" },
  { id: "dob", label: "DOB" },
  { id: "age", label: "Age" },
  { id: "city", label: "City" },
  { id: "university", label: "University" },
  { id: "personalDetails", label: "Personal Details" },
  { id: "address", label: "Address" },
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

function EnhancedTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all users" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ numSelected, onEdit, onView }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => theme.palette.action.selected,
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6">
          User Details
        </Typography>
      )}

      {numSelected > 0 && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onEdit}
            disabled={numSelected !== 1}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onView}
            disabled={numSelected !== 1}
          >
            View
          </Button>
        </Box>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};



export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id || n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = [...selected, id];
    else if (selectedIndex === 0) newSelected = selected.slice(1);
    else if (selectedIndex === selected.length - 1)
      newSelected = selected.slice(0, -1);
    else
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleView = () => {
  if (selected.length === 1) {
    navigate(`/form/${selected[0]}?mode=view`);
  }
};

const handleEdit = () => {
  if (selected.length === 1) {
    navigate(`/form/${selected[0]}?mode=edit`);
  }
};

  return (
    <Box className="w-[90%] mx-auto h-[600px] mt-20 overflow-auto">

      <Paper sx={{ width: "100%", mb: 2 }}>
          <div className="s-bar-btn ">
          <div className="btn absolute top-2 left-2 flex justify-center">
  <input type="search" className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
</div>
         <div className=" flex justify-end mt-4 mb-4">
      <Link
        to="/form"
        className="inline-block px-4 py-2 absolute top-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
         + AddUser
       </Link>
    </div>
   </div>
        <EnhancedTableToolbar
  numSelected={selected.length}
  onEdit={handleEdit}
  onView={handleView}
/>

        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const id = row.id || row._id || index;
                const isItemSelected = isSelected(id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
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
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
