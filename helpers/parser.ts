const EXTENSION = ["xlsx", "xls", "csv"];

export const getExtention = (file: any) => {
  const parts = file.name.split(".");
  const extension = parts[parts.length - 1];
  return EXTENSION.includes(extension);
};

export const convertToJson = (headers: any, data: any) => {
  const rows: any = [];
  data.forEach((row: any) => {
    let rowData: any = {};
    row.forEach((element: any, index: any) => {
      rowData[headers[index]] = element;
    });
    rows.push(rowData);
  });
  return rows;
};
