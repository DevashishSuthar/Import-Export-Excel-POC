const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const { FILE_DIRECTORIES } = require('../constants/global.constant');

const { PUBLIC_DIR, ASSETS_DIR, EXCELS_DIR } = FILE_DIRECTORIES;

const workbook = new ExcelJS.Workbook();

const generateExcelFileFromJson = async (data) => {
    try {
        const { uniqueKeys, parseFileData } = data;
        const worksheet = workbook.addWorksheet(`Sheet-${Date.now()}`);
        worksheet.columns = uniqueKeys.map(key => {
            return { header: key, key, width: 20 };
        });
        worksheet.addRows(parseFileData);
        const excelFilePath = `${ASSETS_DIR}/${EXCELS_DIR}/csv-${Date.now()}.csv`;
        await workbook.csv.writeFile(path.join(__dirname, '..', PUBLIC_DIR, excelFilePath));
        return excelFilePath;
    } catch (error) {
        throw error;
    }
};

const readFile = (dirPath) => {
    return fs.readFileSync(dirPath, { encoding: 'utf-8' });
};

const deleteFile = (filePath) => {
    return fs.unlink(filePath, (err) => {
        if (err) throw error;
    });
};

module.exports = {
    readFile,
    deleteFile,
    generateExcelFileFromJson
};