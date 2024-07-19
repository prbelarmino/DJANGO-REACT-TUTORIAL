import React, { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {Box, FormControl, Button, Typography } from '@mui/material';
import api from "../api";

const UploadForm = ({ updateList }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (values) => {
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await api.post('/api/upload/', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully:');
            updateList();
        } catch (error) {
            alert('Error uploading file:' + error.response.data.error);
        } finally {
            setLoading(false);
            setFile(null);
        }
    }
    else{
        fileInputRef.current.click()
    }
  };

  const resetFile = (event) => {
    setFile(null);
  };
  return (
    <Box sx={{ m: "0 15px 0 0"}}>
      <FormControl>
          <input
            type="file"
            accept=".csv"
            id="fileInput"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
      />
        <Box 
          display="flex"
          flexDirection="row"
          alignItems="center"
          minWidth="150px"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit} 
            size="small"
            disabled={loading}
            sx={{textTransform: "none", p: "3px 10px 3px 3px"}}
          >
            <AddIcon />
            {file ? 'Adicionar: ' + file.name : 'Adicionar Mútiplos'}
          </Button>
          {file &&(
            <IconButton onClick={ (event) => resetFile() }>
             <CloseIcon/>
            </IconButton>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export default UploadForm;
