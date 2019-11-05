import { MiddlewareFn } from 'type-graphql';

import { Context } from 'src/types/Context';

export const isAuthenticated: MiddlewareFn<Context> = async ({ context }, next) => {
  if (context.req.session !== undefined && !context.req.session.userId) {
    throw new Error('Access denied! You need to be authorized to perform this action!');
  }
  return next();
};
