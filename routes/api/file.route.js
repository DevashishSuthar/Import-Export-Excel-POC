const express = require('express');
const router = express.Router();

const { convertExcelToJsonFile, convertJsonToExcelFile } = require('../../controllers/file.controller');
const { fileUploadMiddleware, excelUploadMiddleware } = require('../../middlewares/file-upload.middleware');

router.post('/upload-excel', excelUploadMiddleware, convertExcelToJsonFile);

router.post('/upload-json', fileUploadMiddleware, convertJsonToExcelFile);

module.exports = router;
