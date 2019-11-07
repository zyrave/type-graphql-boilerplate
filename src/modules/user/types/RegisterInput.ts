import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

import { PasswordMixin } from './PasswordInput';
import { IsEmailAlreadyExist } from '../../utils/isEmailAlreadyExist';

@InputType({ isAbstract: true })
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName!: string;

  @Field()
  @Length(1, 255)
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already in use ' })
  email!: string;
}
