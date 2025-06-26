const cds = require('@sap/cds'); // Import SAP CDS runtime
const csvParser = require('csv-parser'); // Import CSV parser for reading CSV files
const stream = require('stream'); // Node.js stream module for handling streams

module.exports = class CSVExtraction extends cds.ApplicationService {
  async init() {
    // Connect to the database and get the TcodeMapping entity
    const db = await cds.connect.to('db');
    const { TcodeMapping } = db.entities;
    // Define a custom action handler 'uploadProducts'
    this.on('uploadProducts', async (req) => {
      const fileBuffer = req.data.file; // Get the uploaded file content
      if (!fileBuffer) return req.error(400, 'No file provided'); // Error if missing
      const csvStream = new stream.PassThrough(); // Create a passthrough stream
      csvStream.end(Buffer.from(fileBuffer, 'base64')); // Convert base64 back to binary stream

      const records = []; // Array to collect parsed records

      // Create a CSV parser stream
      return new Promise((resolve, reject) => {
        csvStream
          .pipe(csvParser()) // Parse the CSV content
          .on('data', (row) => {
            // Extract and trim fields from each row
            const secruityRoleLevel = row.secruityRoleLevel?.trim();
            const s4HanaForSelfServiceUse = row.s4HanaForSelfServiceUse?.trim();
            const tCode = row.tCode?.trim();

            // Push formatted record with UUID
            records.push({
              ID: cds.utils.uuid(),
              secruityRoleLevel,
              s4HanaForSelfServiceUse,
              tCode
            });
          })
          .on('end', async () => {
            try {
              // Insert all valid records into the database
              if (records.length > 0) {
                await INSERT.into(TcodeMapping).entries(records);
              }
              resolve({
                message: '✅ Data extraction has been completed.',
                inserted: records.length
              });
            } catch (err) {
              reject(req.error(500, err.message)); // Handle DB insertion errors
            }
          })
          .on('error', (err) => reject(req.error(500, err.message))); // Handle stream parsing errors
      });
    });

    return super.init(); // Call parent class init
  }
}
