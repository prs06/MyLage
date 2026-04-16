/**
 * MyLage - Google Apps Script Backend
 * This script handles data storage and retrieval for the MyLage fuel tracking app
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Add headers in first row: Date | Vehicle | Petrol Pump | Speedometer | Price | Liters | Total
 * 3. Go to Extensions > Apps Script
 * 4. Replace Code.gs content with this file
 * 5. Update SHEET_NAME constant if needed
 * 6. Deploy as Web App (instructions in DEPLOYMENT.md)
 */

// Configuration
const SHEET_NAME = 'FuelData'; // Change this if your sheet has a different name

/**
 * GET Request Handler
 * Returns all fuel entries as JSON
 * Endpoint: GET {WEB_APP_URL}
 */
function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const rows = data.slice(1);
    
    // Convert to JSON array
    const jsonData = rows.map(row => {
      return {
        date: formatDate(row[0]),
        vehicle: row[1].toString(),
        petrolPump: row[2],
        speedometer: parseFloat(row[3]),
        pricePerLiter: parseFloat(row[4]),
        liters: parseFloat(row[5]),
        total: parseFloat(row[6])
      };
    });
    
    // Sort by date ascending
    jsonData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return ContentService
      .createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString(),
        message: 'Error fetching data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST Request Handler
 * Accepts fuel entry data and appends to sheet
 * Endpoint: POST {WEB_APP_URL}
 * Body: JSON with date, vehicle, petrolPump, speedometer, pricePerLiter, liters, total
 */
function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!validateData(data)) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false,
          message: 'Invalid data: All fields are required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = getSheet();
    
    // Prepare row data
    const rowData = [
      data.date,
      data.vehicle,
      data.petrolPump,
      data.speedometer,
      data.pricePerLiter,
      data.liters,
      data.total
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Sort sheet by date (column A) in ascending order
    const range = sheet.getDataRange();
    range.sort({column: 1, ascending: true});
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Entry added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false,
        error: error.toString(),
        message: 'Error adding entry'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get or create the fuel data sheet
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = ['Date', 'Vehicle', 'Petrol Pump', 'Speedometer', 'Price', 'Liters', 'Total'];
    sheet.appendRow(headers);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4A90E2');
    headerRange.setFontColor('#FFFFFF');
    
    // Set column widths
    sheet.setColumnWidth(1, 100); // Date
    sheet.setColumnWidth(2, 80);  // Vehicle
    sheet.setColumnWidth(3, 120); // Petrol Pump
    sheet.setColumnWidth(4, 120); // Speedometer
    sheet.setColumnWidth(5, 80);  // Price
    sheet.setColumnWidth(6, 80);  // Liters
    sheet.setColumnWidth(7, 80);  // Total
    
    // Freeze header row
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Validate incoming data
 * @param {Object} data - Data to validate
 * @returns {boolean}
 */
function validateData(data) {
  const requiredFields = ['date', 'vehicle', 'petrolPump', 'speedometer', 'pricePerLiter', 'liters', 'total'];
  
  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return false;
    }
  }
  
  // Validate numeric fields
  if (isNaN(data.speedometer) || isNaN(data.pricePerLiter) || isNaN(data.liters) || isNaN(data.total)) {
    return false;
  }
  
  // Validate vehicle number
  if (!['1', '2'].includes(data.vehicle)) {
    return false;
  }
  
  return true;
}

/**
 * Format date to YYYY-MM-DD string
 * @param {Date|string} date - Date to format
 * @returns {string}
 */
function formatDate(date) {
  if (typeof date === 'string') return date;
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Test function to verify GET endpoint
 * Run this from Apps Script editor to test
 */
function testGet() {
  const result = doGet();
  const data = JSON.parse(result.getContent());
  Logger.log(data);
  Logger.log(`Total entries: ${data.length}`);
}

/**
 * Test function to verify POST endpoint
 * Run this from Apps Script editor to test
 */
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        date: '2024-01-15',
        vehicle: '1',
        petrolPump: 'HP KSR',
        speedometer: 12500,
        pricePerLiter: 105.50,
        liters: 25.5,
        total: 2690.25
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

/**
 * Initialize sheet with sample data (optional)
 * Run this once to add sample data for testing
 */
function initializeSampleData() {
  const sheet = getSheet();
  
  const sampleData = [
    ['2024-01-01', '1', 'HP KSR', 10000, 105.00, 30, 3150],
    ['2024-01-08', '1', 'BP MAJ', 10450, 106.50, 28, 2982],
    ['2024-01-15', '1', 'HP KSR', 10890, 105.80, 29, 3068.2],
    ['2024-01-03', '2', 'IOL MNP', 25000, 105.20, 32, 3366.4],
    ['2024-01-10', '2', 'BP ADH', 25480, 106.00, 30, 3180],
    ['2024-01-17', '2', 'HP MNP', 25920, 105.90, 31, 3282.9]
  ];
  
  sampleData.forEach(row => {
    sheet.appendRow(row);
  });
  
  // Sort by date
  const range = sheet.getDataRange();
  range.sort({column: 1, ascending: true});
  
  Logger.log('Sample data added successfully!');
}

/**
 * Clear all data except headers (for testing)
 * Use with caution!
 */
function clearAllData() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    Logger.log('All data cleared!');
  } else {
    Logger.log('No data to clear.');
  }
}

/**
 * Get statistics (for debugging)
 */
function getStats() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  Logger.log(`Total rows: ${data.length - 1}`); // Exclude header
  Logger.log(`Columns: ${data[0].join(', ')}`);
  
  // Count entries per vehicle
  const vehicles = {};
  for (let i = 1; i < data.length; i++) {
    const vehicle = data[i][1];
    vehicles[vehicle] = (vehicles[vehicle] || 0) + 1;
  }
  
  Logger.log('Entries per vehicle:', vehicles);
}
