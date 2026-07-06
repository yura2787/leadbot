const leadHandler = async (ctx) => {
  await ctx.scene.enter('leadScene');
};

module.exports = leadHandler;
