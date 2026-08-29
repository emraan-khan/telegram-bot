require('dotenv').config();

const { Bot } = require('grammy');

//Initilaize bot with env token
const bot = new Bot(process.env.BOT_TOKEN);

// start command
bot.command('start', (ctx) => {
    return ctx.reply('Welcome! Your telegram bot is active and working.');
});

// help command
bot.command('help', (ctx) => {
    return ctx.reply('Available commands:\n/start - Start the bot\n/help - Show help info');
});

// Echo text message
bot.on('message:text', (ctx) => {
    return ctx.reply(`You said: ${ctx.message.text}`);
});

// start bot
bot.start();
console.log('Telegram bot is up and running!');
