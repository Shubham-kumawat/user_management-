// TagManager.jsx
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TagManager = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:3000/tags");
      const data = await response.json();
      setTags(data); // data = [{ name: "reactjs" }, { name: "nodejs" }]
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  return (
    <div>
      <h3>All Tags</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag, index) => (
              <TableRow key={index}>
                <TableCell>{tag.tagName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TagManager;
