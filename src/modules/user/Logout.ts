import { Resolver, Mutation, Ctx } from 'type-graphql';

import { Context } from '../../types/Context';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) => {
      if (ctx.req.session !== undefined)
        ctx.req.session.destroy(err => {
          if (err) {
            console.error(err);
            rej(false);
          }

          ctx.res.clearCookie('qid');
          res(true);
        });
    });
  }
}
