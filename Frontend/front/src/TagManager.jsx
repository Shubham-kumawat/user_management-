import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router";

const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:3000/tags");
      const data = await response.json();
      setTags(data); // data = [{ tagName: "reactjs" }, { tagName: "nodejs" }]
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setLoading(false);
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

    <Box className="min-h-screen bg-gray-100 py-8 px-4">
      <Box className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <Typography variant="h5" component="div" className="text-blue-600 font-bold flex items-center mb-6">
          <TagIcon className="mr-2" /> All Tags
        </Typography>

        {loading ? (
          <Box className="flex justify-center py-10">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} className="rounded-md overflow-hidden">
            <Table>
              <TableHead className="bg-blue-100">
                <TableRow>
                  <TableCell className="font-bold text-gray-700">#</TableCell>
                  <TableCell className="font-bold text-gray-700">Tag Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" className="py-4 text-gray-500">
                      No tags found.
                    </TableCell>
                  </TableRow>
                ) : (
                  tags.map((tag, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="capitalize text-blue-700">{tag.tagName}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
    </div>
  );
};

export default TagManager;
