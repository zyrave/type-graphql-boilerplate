import { Connection } from 'typeorm';

import { testConn } from '../../test-utils/testConn';
import { gCall } from '../../test-utils/gCall';
import { redis } from '../../redis';

let conn: Connection;

beforeAll(async () => {
  try {
    if (redis.status == 'end') {
      await redis.connect();
    }
    conn = await testConn();
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  try {
    await conn.close();
    redis.disconnect();
  } catch (err) {
    console.error(err);
  }
});

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe('Register', () => {
  it('create user', async () => {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: 'Sam',
            lastName: 'Smith',
            email: 'sam.smith@company.com',
            password: '999999',
          },
        },
      }),
    );
  });
});
