import React, { useState, useRef } from 'react';
import {Box, FormControl, Button, Typography } from '@mui/material';
import api from "../api";

const UploadForm = ({ updateList }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async (values) => {
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/api/upload/', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully:');
            updateList();
        } catch (error) {
            console.error('Error uploading file:', error.response.data.error);
        } finally {
        //setSubmitting(false);
            setFile(null);
        }
    }
    else{
        fileInputRef.current.click()
    }
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
        >
        {file ? 'Importar Tabela' : 'Selecionar Tabela'}
      </Button>
      
      <Typography variant="body1" color="textSecondary">
        {file ? file.name : 'Nenhuma Tabela Selecionada'}
      </Typography>
      </Box>
    </FormControl>
    
  );
};

export default UploadForm;
