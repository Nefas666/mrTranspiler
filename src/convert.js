const { ipcRenderer } = require("electron");
const path = require("path");
const Swal = require("sweetalert2");
const Spinner = require("./spinner");
const FileConverter = require("./FileParser");

const spinnerContainer = document.getElementById("spinner-container");
const spinner = new Spinner(spinnerContainer);

const handleFileDrop = (file, outputFolderPath) => {
  spinner.start();

  const xlsxFilePath = file.path;
  const converter = new FileConverter();

  converter
    .convertToCsv(xlsxFilePath, outputFolderPath)
    .then(({ xlsxFilePath, csvFilePath, rowsCount }) => {
      console.log({
        xlsxFilePath,
        csvFilePath,
        rowsCount,
      });

      Swal.fire({
        title: "<b>File convertito con successo!</b>",
        icon: "success",
        html: `<p>Il percorso del file caricato è:<br><a href="file://${xlsxFilePath}">${xlsxFilePath}</a></p><p>Il percorso al file convertito in CSV è:<br><a href="file://${csvFilePath}">${csvFilePath}</a></p><p>Il numero delle righe all'interno del file – intestazione esclusa – è di:<br><b>${rowsCount}</b></p>`,
        showCloseButton: true,
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = `file://${csvFilePath}`;
      downloadLink.download = path.basename(csvFilePath);
      downloadLink.click();
    })
    .catch((error) => {
      console.error("An error occurred during conversion:", error);
    })
    .finally(() => {
      spinner.stop();
    });
};

document.querySelector(".drop-zone").addEventListener("drop", (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;

  ipcRenderer.send("getDownloadsPath");
  ipcRenderer.once("downloadsPath", (event, downloadsPath) => {
    const outputFolderPath = path.resolve(downloadsPath, "output");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      handleFileDrop(file, outputFolderPath);
    }
  });
});

document.querySelector(".drop-zone").addEventListener("dragover", (event) => {
  event.preventDefault();
});
