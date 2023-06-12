const express = require('express');
const fileUpload = require('express-fileupload');
const { execSync } = require('child_process');

const app = express();
app.use(fileUpload());

app.post('/convert-api', (req : any , res: any) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded');
  }

  const file = req.files.file;
  const filePath = `./files/${file.name}`;

  file.mv(filePath, (error:any) => {
    if (error) {
      console.error('Error saving file:', error);
      return res.status(500).send('Error saving file');
    }

    try {
      execSync(`node convert.js -i "${filePath}" -o "../files/"`, { stdio: 'inherit' });
      const outputFilePath = `../files/${file.name.replace('.xlsx', '.csv')}`;
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

export {}