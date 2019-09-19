import { buildSchema } from 'type-graphql';

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + '/../modules/**/!(*.test){.ts,.js}'],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
