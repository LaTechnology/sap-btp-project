const cds = require('@sap/cds');
const csv = require('csv-parser'); // CSV parser library
// const { MediaFile } = require('../db/schema'); // Adjust path if needed

module.exports = (srv) => {
  
  // Action to fetch and parse CSV content
  srv.on('getCSVData', async (req) => {
    const { MediaFile } = cds.entities('MediaFile')
    const fileID = req.data.fileID; // File ID passed from the frontend (or request)

    // Query the MediaFile entity to get the file content (binary)
    const mediaFile = await cds.transaction(req).read(MediaFile).where({ ID: fileID });

    if (mediaFile.length === 0) {
      throw new Error("File not found");
    }

    const fileContent = mediaFile[0].content; // Retrieve the binary content of the file

    // Parse the CSV content and return it as JSON
    const parsedData = await parseCSV(fileContent); // Function to parse the CSV binary data

    return parsedData; // Return the parsed CSV data as JSON
  });
};

// Helper function to parse CSV content (binary) into a JSON object
async function parseCSV(fileContent) {
  return new Promise((resolve, reject) => {
    const results = [];
    const readableStream = require('stream').Readable.from(fileContent); // Convert binary data into a readable stream

    // Parse CSV into JSON
    readableStream
      .pipe(csv()) // Using csv-parser to parse the CSV content
      .on('data', (data) => results.push(data)) // Push each row into results
      .on('end', () => resolve(results)) // Resolve with parsed data once done
      .on('error', (err) => reject(err)); // Reject on error
  });
}
