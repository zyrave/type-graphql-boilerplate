import { Connection } from 'typeorm';
import faker from 'faker';

import { testConn } from '../../utils/test/testConn';
import { gCall } from '../../utils/test/gCall';
import { redis } from '../../redis';
import { User } from '../../entities/User';

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

const meQuery = `
  query {
    me {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });

  it('return null', async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
