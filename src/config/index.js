require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MANAGER_CHAT_ID: process.env.MANAGER_CHAT_ID,
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  GOOGLE_CREDENTIALS_PATH: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
};
