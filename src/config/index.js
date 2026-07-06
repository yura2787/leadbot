require('dotenv').config();

const config = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MANAGER_CHAT_ID: process.env.MANAGER_CHAT_ID,
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  GOOGLE_CREDENTIALS_PATH: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
};

const required = ['BOT_TOKEN', 'MANAGER_CHAT_ID', 'SPREADSHEET_ID'];
const missing = required.filter((key) => !config[key]);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('Please check your .env file.');
  process.exit(1);
}

module.exports = config;
