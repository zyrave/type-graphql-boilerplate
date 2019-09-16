import { Field, InputType } from 'type-graphql';

import { PasswordMixin } from '../../shared/PasswordInput';

@InputType({ isAbstract: true })
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token!: string;
}
