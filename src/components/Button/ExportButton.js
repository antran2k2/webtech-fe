import * as XLSX from 'xlsx';

function ExportButton({ data }) {
    const handleExport = () => {
        
        const worksheet = XLSX.utils.json_to_sheet(data);

        worksheet['A1'].v = 'STT';
        worksheet['B1'].v = 'Mã số sinh viên';
        worksheet['C1'].v = 'Họ và tên';
        worksheet['D1'].v = 'Số lần vắng';

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    return <button onClick={handleExport}>Export to Excel</button>;
}

export default ExportButton;
