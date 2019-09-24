import { Connection } from 'typeorm';
import faker from 'faker';

import { testConn } from '../../utils/test/testConn';
import { gCall } from '../../utils/test/gCall';
import { redis } from '../../redis';
import { User } from '../../entity/User';

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
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });

    if (dbUser !== undefined) {
      expect(dbUser).toBeDefined();
      expect(dbUser.confirmed).toBeFalsy();
      expect(dbUser.firstName).toBe(user.firstName);
    }
  });
});
