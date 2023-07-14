
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
git clone https://github.com/Nefas666/mrTranspiler.git
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
