import { createLogger, transports, format } from 'winston';

  const logger = createLogger({
      transports: [new transports.Console({  level:'silly'})],
      format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
          }),
      ),
  });

export const log = logger;