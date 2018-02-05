var logger = require('winston');

var Discord = require('discord.js');

var pg = require("pg");
var knex = require("knex");

let client;
let bot;

// Set up logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'info';

// Log that the bot has run.
logger.info("[Shiho-bot] Running!");

function initBot(botToken) {
  bot = new Discord.Client();

  // Login using the token.
  logger.info("[Shiho-bot] Logging in...");
  bot.login(botToken).then(() => {
    logger.info('[Shiho-bot] Logged in!');
    logger.info('[Shiho-bot] ' + bot.username + ' - (' + bot.id + ')');
  })

  // Log when the bot is ready.
  bot.on('ready', () => {
    logger.info('[Shiho-bot] Ready!');
  });

  bot.on('message', msg => {
    // Listen to messages that start with "!".
    if (msg.content.substring(0, 1) == '!') {
      var args = msg.content.substring(1).split(' ');
      var cmd = args[0];
       
      args = args.splice(1);
      switch(cmd) {
        // !ping
        case 'ping':
          msg.channel.send('Pong!');
          break;
      }
    }
  });
}

function run()  {
  pg.defaults.ssl = true;
  client = new knex({
    connection: process.env.DATABASE_URL,
    client: "pg"
  });

  client.select('bot_token').table('auth').then((row) => {
    initBot(row[0].bot_token);
  });
}

run();
