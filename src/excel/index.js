import xlsx from 'xlsx';

const currentDate = new Date();
const timestamp = currentDate.toISOString().replace(/:/g, '-');

export async function saveDataToExcel(data) {
  console.log('Saving data to Excel file...');

  const clientName = data[0].client.replace(/ /g, '-').toLowerCase();
  const filename = `./professores-${clientName}.xlsx`;
  const fileNameHistory = `./files/professores-${clientName}-${timestamp}.xlsx`;

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, clientName);
  xlsx.writeFile(workbook, filename);

  const historyWorkbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(historyWorkbook, worksheet, clientName);
  xlsx.writeFile(historyWorkbook, fileNameHistory);

  console.log(`Data saved to file: ${filename}`);
}
