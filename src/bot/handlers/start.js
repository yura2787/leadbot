const startHandler = async (ctx) => {
  await ctx.reply(
    `👋 Hello, ${ctx.from.first_name}!\n\nI'll help you submit a request. It will only take a minute.\n\nPress the button below to get started.`,
    {
      reply_markup: {
        keyboard: [[{ text: '📝 Submit a request' }]],
        resize_keyboard: true,
      },
    }
  );
};

module.exports = startHandler;
