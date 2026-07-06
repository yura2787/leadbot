const { Telegraf, Scenes, session } = require('telegraf');
const { BOT_TOKEN } = require('../config');
const startHandler = require('./handlers/start');
const leadHandler = require('./handlers/lead');
const leadScene = require('./scenes/leadScene');

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([leadScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start(startHandler);
bot.hears('📝 Submit a request', leadHandler);

bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
});

module.exports = bot;
