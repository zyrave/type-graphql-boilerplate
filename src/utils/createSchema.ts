import { buildSchema } from 'type-graphql';

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + '/../modules/**/!(*.test).ts'],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
