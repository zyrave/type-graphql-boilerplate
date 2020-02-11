let host = 'localhost';
let SOURCE_PATH = 'src';

if (process.env.USE_DOCKER && process.env.USE_DOCKER.toLowerCase() === 'true') {
  host = process.env.DB_HOST || 'localhost';
  SOURCE_PATH = process.env.NODE_ENV === 'production' ? '.' : 'src';
} else {
  SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
}

const baseOptions = {
  name: 'default',
  type: process.env.DB_TYPE,
  host,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [`${SOURCE_PATH}/entities/**{.ts,.js}`],
  migrations: [`${SOURCE_PATH}/migrations/**{.ts,.js}`],
  subscribers: [`${SOURCE_PATH}/subscribers/**{.ts,.js}`],
  cli: {
    entitiesDir: `${SOURCE_PATH}/entities`,
    migrationsDir: `${SOURCE_PATH}/migrations`,
    subscribersDir: `${SOURCE_PATH}/subscribers`,
  },
};

const defaultConfig = Object.assign(baseOptions, {
  database: process.env.DB_NAME,
});

const oracleConfig = Object.assign(baseOptions, {
  sid: process.env.DB_NAME,
});

module.exports = process.env.DB_TYPE === 'oracle' ? oracleConfig : defaultConfig;
