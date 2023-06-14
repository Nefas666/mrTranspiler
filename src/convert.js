"use strict";
exports.__esModule = true;
var express = require('express');
var fileUpload = require('express-fileupload');
var execSync = require('child_process').execSync;
var app = express();
app.use(fileUpload());
app.post('/convert-api', function (req, res) {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded');
    }
    var file = req.files.file;
    if (Array.isArray(file)) {
        // Handle the case when file is an array of files
        return res.status(400).send('Multiple files uploaded. Only one file is allowed.');
    }
    var filePath = "".concat(__dirname, "/files/").concat(file.name);
    file.mv(filePath, function (error) {
        if (error) {
            console.error('Error saving file:', error);
            return res.status(500).send('Error saving file');
        }
        try {
            execSync("node convert-api.js -i \"".concat(filePath, "\" -o \"").concat(__dirname, "/files/\""), { stdio: 'inherit' });
            var outputFilePath = "".concat(__dirname, "/files/").concat(file.name.replace('.xlsx', '.csv'));
            return res.json({ success: true, outputFilePath: outputFilePath });
        }
        catch (error) {
            console.error('Error converting file:', error);
            return res.status(500).send('Error converting file');
        }
    });
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
