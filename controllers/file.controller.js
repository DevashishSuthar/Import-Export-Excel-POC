const path = require('path');

const { BAD_REQUEST } = require('../constants/http-status-code.constant');
const { FILE_MESSAGES, COMMON_MESSAGES } = require('../constants/messages.constant');
const apiHelper = require('../helpers/api.helper');
const { readFile, generateExcelFileFromJson } = require('../helpers/utils.helper');

const generateExcelFile = async (req, res) => {
    try {
        const { file, fileValidationError } = req;
        if (fileValidationError) {
            return apiHelper.failure(res, COMMON_MESSAGES.JSON_FORMAT_ALLOWED, [], BAD_REQUEST);
        }
        if (!file) {
            return apiHelper.failure(res, COMMON_MESSAGES.FILE_REQUIRED, [], BAD_REQUEST);
        }
        const { path: filePath } = file;
        const jsonStringifyFileData = await readFile(path.join(__dirname, '..', filePath));
        if (jsonStringifyFileData) {
            const parseFileData = JSON.parse(jsonStringifyFileData);
            const uniqueKeysForHeader = Object.keys(parseFileData.reduce((result, obj) => Object.assign(result, obj), {}));
            const excelFilePath = await generateExcelFileFromJson({ uniqueKeysForHeader, parseFileData });
            return apiHelper.success(res, FILE_MESSAGES.GENERATE_EXCEL, { excelFilePath });
        }
        return apiHelper.failure(res, FILE_MESSAGES.GENERATE_EXCEL_ERROR, [], BAD_REQUEST);
    } catch (error) {
        return apiHelper.failure(res, error.message);
    }
};

module.exports = {
    generateExcelFile
};