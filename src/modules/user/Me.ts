import { Resolver, Query, Ctx } from 'type-graphql';

import { User } from '../../entities/User';
import { Context } from '../../types/Context';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    if (ctx.req.session === undefined) {
      return undefined;
    } else {
      if (!ctx.req.session.userId) {
        return undefined;
      }
      return User.findOne(ctx.req.session.userId);
    }
  }
}
