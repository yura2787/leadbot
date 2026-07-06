const { google } = require('googleapis');
const config = require('../config');

const getClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: config.GOOGLE_CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth.getClient();
};

const saveLead = async (lead) => {
  const client = await getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.SPREADSHEET_ID,
    range: 'Leads!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        lead.date,
        lead.name,
        lead.phone,
        lead.interest,
        lead.username,
      ]],
    },
  });

  console.log('📊 Lead saved to Google Sheets:', lead.name);
};

module.exports = { saveLead };
