import * as React from 'react';
import { useState } from 'react';
import { Stack, Button, Typography, Container, FilledInput } from '@mui/material';

// import convert from '../api/convert'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleConvertClick = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post('/convert-api', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Conversion completed successfully!', response.data);
      } catch (error) {
        console.error('An error occurred during conversion:', error);
      }
    }
  };

  return (
    <Container maxWidth={'md'}>
      <Stack direction="column">
        <Typography variant="h3" color="text.primary" align="center">
          Transpiler XLSX CSV
        </Typography>
        <FilledInput
          id="inputFile"
          type="file"
          fullWidth={true}
          color="secondary"
          onChange={handleFileSelect}
        />
        <Button variant="outlined" onClick={handleConvertClick}>
          Convert
        </Button>
      </Stack>
    </Container>
  );
}

export default App;