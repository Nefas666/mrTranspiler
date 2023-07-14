// fileConverter.js
const readXlsxFile = require("read-excel-file/node");
const Papa = require("papaparse");
const fs = require("fs");
const path = require("path");

class FileParser {
  convertToCsv(xlsxFilePath, outputFolderPath) {
    return new Promise((resolve, reject) => {
      readXlsxFile(xlsxFilePath)
        .then((rows) => {
          const convertedRows = this.processRows(rows);

          const csvFile = convertedRows.map((row) => {
            return row.map((cell) => {
              if (typeof cell === 'string' && cell.includes('_x')) {
                return cell.replace(/_x(\w{4})_/g, (match, hexCode) => String.fromCharCode(parseInt(hexCode, 16)));
              }
              return cell;
            });
          });

          const csvString = Papa.unparse(csvFile, {
            quotes: true,
            quoteChar: '"',
            delimiter: ',',
          });

          const xlsxFileName = path.basename(xlsxFilePath, ".xlsx");
          const csvFilePath = path.join(outputFolderPath, `${xlsxFileName}.csv`);

          fs.mkdirSync(outputFolderPath, { recursive: true });

          fs.writeFile(csvFilePath, csvString, 'utf8', (error) => {
            if (error) {
              reject(`Error writing CSV file: ${error}`);
            } else {
              const rowsCount = convertedRows.length - 1;
              resolve({ xlsxFilePath, csvFilePath, rowsCount });
            }
          });
        })
        .catch((error) => {
          reject(`Error reading Excel file: ${error}`);
        });
    });
  }

  processRows(rows) {
    const firstRow = rows[0];
    const isDobField = firstRow.includes('data_di_nascita');

    return rows.map((row, index) => {
      if (!isDobField) return row;
      if (index === 0) return row;
      let dobIndex = firstRow.indexOf("data_di_nascita");
      let dob = row[dobIndex];

      if (typeof dob === 'string' && dob.includes('/')) {
        const [day, month, yearLastTwo] = dob.split('/');
        const yearPrefix = new Date().getFullYear().toString().slice(0, 2);
        const year = yearPrefix + yearLastTwo;
        const formattedDate = `${day}/${month}/${year}`;
        return [...row.slice(0, dobIndex), formattedDate, ...row.slice(dobIndex + 1)];
      } else if (dob instanceof Date) {
        const formattedDate = dob.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return [...row.slice(0, dobIndex), formattedDate, ...row.slice(dobIndex + 1)];
      } else {
        return row;
      }
    }).filter((i) => i);
  }
}

module.exports = FileParser;
