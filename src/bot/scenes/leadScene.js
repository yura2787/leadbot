const { Scenes, Markup } = require('telegraf');
const { validateName, validatePhone } = require('../../services/validator');

const leadScene = new Scenes.WizardScene(
  'leadScene',

  async (ctx) => {
    await ctx.reply("What is your name? ✍️", Markup.keyboard([['❌ Cancel']]).resize());
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (ctx.message.text === '❌ Cancel') return cancelScene(ctx);

    const nameCheck = validateName(ctx.message.text);
    if (!nameCheck.valid) {
      await ctx.reply(`❗ ${nameCheck.error}`);
      return;
    }

    ctx.wizard.state.name = nameCheck.value;
    await ctx.reply(
      'Please share your phone number 📱',
      Markup.keyboard([
        [Markup.button.contactRequest('📲 Share phone number')],
        ['❌ Cancel'],
      ]).resize()
    );
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (ctx.message.text === '❌ Cancel') return cancelScene(ctx);

    const rawPhone = ctx.message.contact
      ? ctx.message.contact.phone_number
      : ctx.message.text;

    const phoneCheck = validatePhone(rawPhone);
    if (!phoneCheck.valid) {
      await ctx.reply(`❗ ${phoneCheck.error}`);
      return;
    }

    ctx.wizard.state.phone = phoneCheck.value;
    await ctx.reply('What are you interested in? 🤔', Markup.keyboard([['❌ Cancel']]).resize());
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (ctx.message.text === '❌ Cancel') return cancelScene(ctx);

    ctx.wizard.state.interest = ctx.message.text;

    const lead = {
      name: ctx.wizard.state.name,
      phone: ctx.wizard.state.phone,
      interest: ctx.wizard.state.interest,
      username: ctx.from.username || '—',
      date: new Date().toLocaleString('en-GB'),
    };

    try {
      const sheets = require('../../services/sheets');
      const notifier = require('../../services/notifier');

      await sheets.saveLead(lead);
      await notifier.notifyManager(ctx, lead);

      await ctx.reply(
        '✅ Thank you! Your request has been received.\nA manager will contact you shortly.',
        Markup.keyboard([['📝 Submit a request']]).resize()
      );
    } catch (err) {
      console.error('Error saving lead:', err);
      await ctx.reply('❗ Something went wrong. Please try again later.');
    }

    return ctx.scene.leave();
  }
);

async function cancelScene(ctx) {
  await ctx.reply(
    'Cancelled. You can start over anytime.',
    Markup.keyboard([['📝 Submit a request']]).resize()
  );
  return ctx.scene.leave();
}

module.exports = leadScene;
