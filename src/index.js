const bot = require('./bot');

bot.launch().then(() => {
  console.log('🤖 LeadFlow Bot is running');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
