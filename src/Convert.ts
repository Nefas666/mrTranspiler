import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import express from 'express';

//const express = require('express');
const fileUpload = require('express-fileupload');
const { execSync } = require('child_process');

const app = express();
app.use(fileUpload());

app.post('/convert-api', (req : Request , res:Response) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded');
  }

  const file = req.files.file as UploadedFile;
  if (Array.isArray(file)) {
    // Handle the case when file is an array of files
    return res.status(400).send('Multiple files uploaded. Only one file is allowed.');
  }
  const filePath = `${__dirname}/files/${file.name}`;

  file.mv(filePath, (error) => {
    if (error) {
      console.error('Error saving file:', error);
      return res.status(500).send('Error saving file');
    }

    try {
      execSync(`node convert-api.js -i "${filePath}" -o "${__dirname}/files/"`, { stdio: 'inherit' });
      const outputFilePath = `${__dirname}/files/${file.name.replace('.xlsx', '.csv')}`;
      return res.json({ success: true, outputFilePath });
    } catch (error) {
      console.error('Error converting file:', error);
      return res.status(500).send('Error converting file');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export{};
