export = {
  name: 'default',
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: ['src/entity/*.*'],
};
