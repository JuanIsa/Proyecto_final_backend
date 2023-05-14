import winston from 'winston';

const customsLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        debug: 4
    }
}

const logger = winston.createLogger({
    levels: customsLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: 'fatal'}),
        new winston.transports.File({filename: './errors.log', level: 'warning'})
    ]
}); 

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};

export default addLogger;