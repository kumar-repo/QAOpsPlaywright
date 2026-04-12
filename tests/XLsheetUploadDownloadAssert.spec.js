const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText); // not async

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");

test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    // Start listening for the browser download event before clicking.
    // Reason: if we click first, Playwright may miss the download event.
    const downloadPromise = page.waitForEvent('download');

    // Click the Download button that triggers the Excel file download.
    await page.getByRole('button', { name: 'Download' }).click();

    // Capture the actual Download object returned by Playwright.
    // Reason: this object gives access to the downloaded file so we can save it.
    const download = await downloadPromise;

    // Define the local file path where we want to save the downloaded Excel file.
    // Reason: ExcelJS needs a real file path to read and update the file.
    const filePath = '/Users/kumar/Downloads/downloads.xlsx';

    // Explicitly save the downloaded file to the path above.
    // Reason: waitForEvent('download') only detects the download;
    // it does not automatically save it to your custom path.
    await download.saveAs(filePath);
    // ✅ Ensure the edit finishes before upload
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});