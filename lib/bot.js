var logger = require('winston');

// Set up logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'info';

// Log that the bot has run.
logger.info("[Shiho-bot] Running!");
