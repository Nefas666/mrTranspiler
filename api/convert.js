import fs from 'fs';
var CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '45ccf5df-8630-4797-9231-c40160de1ebc';

var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

var inputFile = Buffer.from(fs.readFileSync("./assets/*.xlsx").buffer); // File | Input file to perform the operation on.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.convertDocumentXlsToCsv(inputFile, callback);