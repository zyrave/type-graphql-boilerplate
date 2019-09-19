let host = 'localhost';
let SOURCE_PATH = 'src';

if (process.env.USE_DOCKER === 'true') {
  host = process.env.DB_HOST;
  SOURCE_PATH = process.env.NODE_ENV === 'production' ? '.' : 'src';
} else {
  SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
}

module.exports = {
  name: 'default',
  type: process.env.DB_TYPE,
  host,
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [`${SOURCE_PATH}/entity/**{.ts,.js}`],
};
