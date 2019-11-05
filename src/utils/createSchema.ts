import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + '/../modules/**/!(*.test){.ts,.js}'],
    container: Container,
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
