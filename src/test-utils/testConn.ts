import { createConnection, Connection } from 'typeorm';
export const testConn = async (drop = false): Promise<Connection> => {
  return await createConnection({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'typegraphql-example-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../entity/*.*'],
  });
};
