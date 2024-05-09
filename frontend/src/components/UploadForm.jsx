import React, { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    <FormControl>
      <Box ml="20px">
      <input
        type="file"
        accept=".csv"
        id="fileInput"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button 
        onClick={handleSubmit} 
        color="secondary" 
        variant="contained"
        //sx={{ mr: 4, ml: 4}}
        disabled={loading}
        >
          {file ? 'Importar Tabela' : 'Selecionar Tabela'}
        </Button>

        <Box display="flex" alignItems="center" height="20px">
          <Typography variant="body1" color="textSecondary" style={{ margin: '0px' }}>
            {file ? file.name : 'Nenhuma Tabela Selecionada'}
          </Typography>
          {file &&(
            <IconButton onClick={ (event) => resetFile() }>
              <CloseIcon/>
            </IconButton>
          )}
        </Box>
      </Box>
    </FormControl>
    
  );
};

export default UploadForm;
