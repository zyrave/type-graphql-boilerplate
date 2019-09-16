import { Resolver, Mutation, Ctx } from 'type-graphql';

import { MyContext } from './../../types/MyContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((res, rej) => {
      if (ctx.req.session !== undefined)
        ctx.req.session.destroy(err => {
          if (err) {
            console.log(err);
            rej(false);
          }

          ctx.res.clearCookie('qid');
          res(true);
        });
    });
  }
}
