import winston from "winston";
const {combine, timestamp, json} = winston.format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const logger = winston.createLogger({
  levels: logLevels,
  level: "trace",
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});
