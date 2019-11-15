import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entities/User';
import { RegisterInput } from './types/RegisterInput';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { sendEmail } from './../utils/sendEmail';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => User)
  async register(@Arg('data')
  {
    firstName,
    lastName,
    email,
    password,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
