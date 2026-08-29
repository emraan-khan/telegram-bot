require('dotenv').config();

const { Bot } = require('grammy');

// validate env variables
if (!process.env.BOT_TOKEN) {
    console.error('❌ Error: BOT_TOKEN is missing in your .env file!');
    process.exit(1);
}

//Initilaize bot with env token
const bot = new Bot(process.env.BOT_TOKEN);

// Global Error handler
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    console.error(err.error);
})

// Register start command
bot.command('start', async (ctx) => {
    await ctx.reply('*Welcome to the Flipkart Stock & Price Checker Bot!*\n\n' +
        'Paste any Flipkart product link here, and I will check if it is in stock and available to buy!',
        { parse_mode: 'Markdown' });
});

// help command
bot.command('help', async (ctx) => {
    await ctx.reply(
        '📖 *How to use:*\n\n' +
        '1. Copy a product link from Flipkart.\n' +
        '2. Paste it directly in this chat.\n' +
        '3. I will return the price, image, and stock availability status!',
        { parse_mode: 'Markdown' }
    );
});

// Echo text message
bot.on('message:text', async (ctx) => {
    const text = ctx.message.text.trim();

    if (text.includes('flipkart.com')) {
        await ctx.reply('🔍 Received Flipkart link! Checking stock status...');
        // scraper service here
    } else {
        await ctx.reply('Please send a valid Flipkart product link, or type /help.');
    }
});

// start bot
bot.start({
    onStart: (botInfo) => {
        console.log(`🤖 Bot @${botInfo.username} is up and running!`);
    }
});
console.log('Telegram bot is up and running!');
