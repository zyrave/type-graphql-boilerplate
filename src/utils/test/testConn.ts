import { createConnection, Connection } from 'typeorm';

export const testConn = async (drop = false): Promise<Connection> => {
  return await createConnection({
    name: 'default',
    type: 'oracle',
    host: process.env.DB_HOST || 'localhost',
    port: 1521,
    username: 'dev',
    password: 'dev',
    sid: 'xepdb1',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../../entity/*.ts'],
  });
};
