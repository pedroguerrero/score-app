import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_HOSTNAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
