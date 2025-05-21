import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import { Link } from "react-router";
const AddTagForm = ({ onClose, onTagAdded }) => {
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagName: tagName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add tag');
      }

      setSuccess(true);
      setTagName('');

      if (onTagAdded) onTagAdded(data);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
          <Link
          to="/tags"
          className=" w-40 mt-2 ml-20 block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
       Go Back
        </Link>
      </div>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Tag
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
            disabled={loading}
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
         
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !tagName.trim()}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Tag'}
            </Button>
          </Box>
        </form>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">Tag added successfully!</Alert>
        </Snackbar>
      </Paper>
    </Box>
    </div>
  );
};

export default AddTagForm;
