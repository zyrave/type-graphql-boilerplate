import { MiddlewareFn } from 'type-graphql';

import { MyContext } from 'src/types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (context.req.session !== undefined && !context.req.session.userId) {
    throw new Error(
      'Access denied! You need to be authorized to perform this action!',
    );
  }
  return next();
};
