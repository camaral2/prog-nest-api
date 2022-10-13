import dotEnvExtended from 'dotenv-extended';
//import dotenvParseVariables from 'dotenv-parse-variables';
//import { parse } from 'path';
import dotenvParseVariables = require('dotenv-parse-variables');

const env = dotEnvExtended.load({
  path: process.env.ENV_FILE,
  defaults: './config/.env.defaults',
  schema: './config/.env.schema',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

// Define log levels type (silent + Winston default npm)
type LogLevel =
  | 'silent'
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

interface Config {
  loggerLevel: LogLevel;
}

const config: Config = {
  loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
};

export default config;
