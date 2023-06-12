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
        const newFile = rows
          .map((row, index) => {
            if (index === 0) return row;

            let [dob] = row.slice(-1);
            if (dob) {
              const rowDob = row.pop();
              const date = moment(rowDob).format("L");
              const [day, month, year] = date.split("/");
              const formattedYear =
                year.length === 2
                  ? parseInt(year) > parseInt(moment().format("YY")) - 18
                    ? "19" + year
                    : "20" + year
                  : year;

              const formattedDate = `${day}/${month}/${formattedYear}`;
              return [...row, formattedDate];
            }
            return row;
          })
          .filter((i) => i);

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
