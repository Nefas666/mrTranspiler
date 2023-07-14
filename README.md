
# XLSX TO CSV Parser – Parse and convert your Excel files into .CSV's


XLSX TO CSV Parser is an **Electron application** that provides conversion and parsing functionalities to transform an Excel .xlsx file into a .csv file. It allows you to parse files and perform date fetching and string parsing operations on the data contained in them.

For more information about Electron usage see the official documentation [here](https://www.electronjs.org/docs/latest/).

### Features

- Direct download of the parsed file
- Fullscreen mode
- Cross platform

## Before you begin, ensure you have met the following requirements:

* You have installed [Node.js](https://nodejs.org/en/) v.8.0.0^;
* You have installed [Git](https://git-scm.com/);

## Getting started
Clone the repository
```
git clone 
```
Install all dependencies
```
cd parser
npm install
```
### Run Locally
To start Parser in development mode, run the following command:
```
npm start
```
This will launch the application and open the main window.

### Create App Package

If you run the make script, Electron Forge will generate you platform specific distributables for you to share with everyone. 

```
npm run make
```

## Scripts Table

| ```start```  |   Launches the Electron application using Electron Forge. |
|---|---|
|  ```package``` |   Packages the application using Electron Forge. |
|  ```make``` | Creates distributable installers for the application using Electron Forge. |
|   ```publish```|  Publishes the packaged application using Electron Forge. |

## Dependencies
 
![Papaparse](https://img.shields.io/librariesio/release/npm/papaparse/5.4.1?logo=npm&label=papaparse%405.4.1&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpapaparse%3FactiveTab%3Dversions.svg)

![Date-fns](https://img.shields.io/librariesio/release/npm/date-fns/2.30.0?logo=npm&label=date-fns%402.30.0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpapaparse%3FactiveTab%3Dversions.svg)

![read-excel-file](https://img.shields.io/librariesio/release/npm/read-excel-file/5.6.1?logo=npm&label=read-excel-file%405.6.1&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fread-excel-file.svg)

![electron-squirrel-startup](https://img.shields.io/librariesio/release/npm/electron-squirrel-startup/1.0.0?logo=npm&label=electron-squirrel-startup%401.0.0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Felectron-squirrel-startup.svg)

![sweetalert2](https://img.shields.io/librariesio/release/npm/sweetalert2/11.7.16?logo=npm&label=sweetalert2%401.0.0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsweetalert2.svg)


## Authors

* [@selene_manno](#)

* [@salvatore_orlando](#)


## Appendix

### Roadmap of the App-Logic Development

- We've started by building the app from scratch using the basic input-I/O structure and drawing on it the key phases of the conversion we had to perform on those files.
![img-roadmap](https://imagizer.imageshack.com/img924/8237/XYji8W.jpg)

- We so initially developed a Node.js script executed on the terminal CLI.
The code snippet performed the conversion action on the whole input path directory and retrieved as output the matching csv file for each parsed xlsx.
Here's the sample of the initial snippet.
```js
const readXlsxFile = require("read-excel-file/node");
const Papa = require("papaparse");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const glob = require("glob");

program
  .option("-i, --input <string>")
  .option("-o, --output <string>");

program.parse();

const options = program.opts();
const { input, output } = options;

const inputFolderPath = path.resolve(__dirname, input);
const outputFolderPath = path.resolve(__dirname, output);

const convertXlsxToCsv = (xlsxFilePath) => {
  return new Promise((resolve, reject) => {
    readXlsxFile(xlsxFilePath)
      .then((rows) => {
        const firstRow = rows[0];
        const isDobField = firstRow.includes('data_di_nascita');
        console.log(firstRow);
        console.log(isDobField);

        const newFile = rows.map((row, index) => {
          if (!isDobField) return row;
          if (index === 0) return row;

          let dob = row[firstRow.indexOf('data_di_nascita')];
          console.log(dob);
          if (dob) {
            const date = moment(dob).format("DD/MM/YYYY");
            console.log(date);
            return [...row, date];
          }
          return row;
        }).filter((i) => i);

        const jsonFile = JSON.stringify(newFile);
        const csvFile = Papa.unparse(jsonFile);

        const xlsxFileName = path.basename(xlsxFilePath, ".xlsx");
        const csvFilePath = path.join(outputFolderPath, `${xlsxFileName}.csv`);

        fs.writeFile(csvFilePath, csvFile, "utf8", (error) => {
          if (error) {
            reject(`Error writing CSV file: ${error}`);
          } else {
            const rowsCount = rows.length - 1;
            resolve({ xlsxFilePath, csvFilePath, rowsCount });
          }
        });
      })
      .catch((error) => {
        reject(`Error reading Excel file: ${error}`);
      });
  });
};

const convertXlsxFilesInFolder = (folderPath) => {
  const xlsxFilesPattern = path.join(folderPath, "*.xlsx");
  glob(xlsxFilesPattern, (error, xlsxFiles) => {
    if (error) {
      console.error("Error finding XLSX files:", error);
      process.exit(1);
    }
    const convertPromises = xlsxFiles.map((xlsxFilePath) =>
      convertXlsxToCsv(xlsxFilePath)
    );
    Promise.all(convertPromises)
      .then((results) => {
        console.log("Conversion completed successfully!");
        results.forEach(({ xlsxFilePath, csvFilePath, rowsCount }) => {
          console.log({
            xlsxFilePath,
            csvFilePath,
            rowsCount,
          });
        });
      })
      .catch((error) => {
        console.error("An error occurred during conversion:", error);
      });
  });
};

convertXlsxFilesInFolder(inputFolderPath);

```
 
- Although the working code, we had to keep in mind that we needed to build something more approachable for non-tech users. So, as we were considering a web application running both client and server side, and we instantly encountered the issue of letting communicate the core (server) and the gui (client), Salvatore tought about Electron and suggested it as a possible framework to use that was capable of building a cross-platform app runnung on a browser window.

- We started building the app, leveraging on the basic structure of an *Electron Forge* boilerplate. Then, as we checked the code was running clean, we refactored based on the **SOLID principles for Software Development** it and published the first version of our app.


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
This project uses the following license: [MIT License](<link>).

######  Copyright (c) [2023]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

###### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.