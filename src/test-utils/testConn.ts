import { createConnection, Connection } from 'typeorm';

export const testConn = async (drop = false): Promise<Connection> => {
  return await createConnection({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'typegraphql-example-test',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../entity/*.ts'],
  });
};
