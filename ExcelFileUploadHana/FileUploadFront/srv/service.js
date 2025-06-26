const cds = require('@sap/cds');
const XLSX = require('xlsx');

module.exports = class MyService extends cds.ApplicationService {
  async init() {
    const { customer } = this.entities;

    this.on('uploadBase64', async (req) => {
      try {
        const base64String = req.data.input;

        // Detect format from MIME type (optional enhancement)
        const isExcel = base64String.startsWith('UEsDB'); // Excel files often start with this
        const buffer = Buffer.from(base64String, 'base64');
        let records = [];

        if (isExcel) {
          // ✅ Parse Excel
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

          records = jsonData.map(row => {
            const name = row.name || row.Name;
            const location = row.location || row.Location;
            if (!name || !location) throw new Error("Missing 'name' or 'location' in Excel row.");
            return {
              id: cds.utils.uuid(),
              name,
              location
            };
          });
        } else {
          // ✅ Parse CSV
          const decodedCSV = buffer.toString('utf-8');
          const lines = decodedCSV.trim().split('\n');
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          const nameIndex = headers.indexOf('name');
          const locationIndex = headers.indexOf('location');

          if (nameIndex === -1 || locationIndex === -1) {
            throw new Error("CSV must have 'name' and 'location' headers.");
          }

          records = lines.slice(1).map(line => {
            const values = line.split(',');
            const name = values[nameIndex]?.trim();
            const location = values[locationIndex]?.trim();
            if (!name || !location) throw new Error("Missing name/location in CSV row.");
            return {
              id: cds.utils.uuid(),
              name,
              location
            };
          });
        }

        // Insert into DB
        await INSERT.into(customer).entries(records);

        return {
          message: `Inserted ${records.length} customers from ${isExcel ? 'Excel' : 'CSV'} file.`
        };

      } catch (err) {
        console.error("Upload failed:", err.message);
        return req.error(400, "Upload failed: " + err.message);
      }
    });

    return super.init();
  }
};
