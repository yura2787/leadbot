const config = require('../config');

const notifyManager = async (ctx, lead) => {
  const message = `
🔔 New lead received!

👤 Name: ${lead.name}
📱 Phone: ${lead.phone}
💬 Interest: ${lead.interest}
🐦 Username: ${lead.username ? '@' + lead.username : '—'}
🕐 Date: ${lead.date}
  `.trim();

  await ctx.telegram.sendMessage(config.MANAGER_CHAT_ID, message);

  console.log('🔔 Manager notified:', lead.name);
};

module.exports = { notifyManager };
