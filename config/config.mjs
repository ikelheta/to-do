import path, { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import Joi from "joi";

/* eslint no-underscore-dangle: 0 */
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = Joi.object()
  .keys({
    MONGODB_HOST: Joi.string().required(),
    MONGODB_NAME: Joi.string().required(),
    MONGODB_PORT: Joi.number().required(),
    NODE_ENV: Joi.string()
      .valid("development", "stage", "production")
      .required(),
    PARAMETER_LIMIT: Joi.number().required(),
    PORT: Joi.number().required(),
    REQUEST_LIMIT: Joi.number().required(),
  })
  .unknown();

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env, { stripUnknown: true });

if (error) {
  throw new Error(`Configuration Validation Error: ${error.message}`);
}

const config = {
  env: env.NODE_ENV,
  mongoose: {
    options: {
      autoIndex: false,
      // Close sockets after 45 seconds of inactivity
      family: 4,

      // Don't build indexes
      maxPoolSize: 10,
      // Maintain up to 10 socket connections (Please Reconfig when needed)
      serverSelectionTimeoutMS: 5000,
      // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Use IPv4, skip trying IPv6
    },
    url: `mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_NAME}`,
  },
  port: env.PORT,
  router: {
    limit: {
      parameter: env.PARAMATER_LIMIT,
      request: env.REQUEST_LIMIT,
    },
  },
};

export default config;
