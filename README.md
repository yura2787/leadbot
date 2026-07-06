# LeadFlow Bot

A Telegram bot for automated lead capture. Collects user requests via a step-by-step wizard, saves them to Google Sheets, and instantly notifies the manager.

## How it works

1. User sends `/start`
2. Bot launches a wizard with 3 questions:
   - Full name
   - Phone number (via contact share button or manual input)
   - What they are interested in
3. Each field is validated before moving to the next step
4. Lead is saved to Google Sheets
5. Manager receives an instant Telegram notification
6. User gets a confirmation message

## Tech Stack

- **Node.js** + **Telegraf v4** — Telegram bot framework
- **Google Sheets API** — lead storage
- **dotenv** — environment configuration
- **Docker** + **docker-compose** — containerized deployment

## Project Structure

```
src/
├── bot/
│   ├── handlers/
│   │   ├── start.js       # /start command handler
│   │   └── lead.js        # launches the wizard scene
│   ├── scenes/
│   │   └── leadScene.js   # 4-step wizard form
│   └── index.js           # bot setup, middleware, routes
├── services/
│   ├── sheets.js          # Google Sheets integration
│   ├── notifier.js        # manager Telegram notification
│   └── validator.js       # name and phone validation
├── config/
│   └── index.js           # environment variables
└── index.js               # entry point
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/leadbot.git
cd leadbot
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in `.env`:

```
BOT_TOKEN=your_telegram_bot_token
MANAGER_CHAT_ID=your_telegram_chat_id
SPREADSHEET_ID=your_google_spreadsheet_id
GOOGLE_CREDENTIALS_PATH=./credentials.json
```

- `BOT_TOKEN` — get from [@BotFather](https://t.me/BotFather)
- `MANAGER_CHAT_ID` — get from [@userinfobot](https://t.me/userinfobot)
- `SPREADSHEET_ID` — the ID from your Google Sheets URL

### 3. Google Sheets setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable **Google Sheets API**
3. Create a **Service Account** and download `credentials.json`
4. Place `credentials.json` in the project root
5. Create a Google Sheet with a sheet named `Leads`
6. Share the sheet with the `client_email` from `credentials.json` (Editor access)

### 4. Run locally

```bash
npm install
node src/index.js
```

### 5. Run with Docker

```bash
docker-compose up --build
```

## Google Sheets Format

| A | B | C | D | E |
|---|---|---|---|---|
| Date | Name | Phone | Interest | Username |

## Environment Variables

| Variable | Description |
|---|---|
| `BOT_TOKEN` | Telegram bot token from BotFather |
| `MANAGER_CHAT_ID` | Telegram ID to receive lead notifications |
| `SPREADSHEET_ID` | Google Spreadsheet ID |
| `GOOGLE_CREDENTIALS_PATH` | Path to Google service account credentials |
