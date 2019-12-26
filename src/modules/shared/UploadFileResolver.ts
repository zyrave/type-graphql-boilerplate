import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { Upload } from '../../types/Upload';

@Resolver()
export class UploadFileResolver {
  @Mutation(() => Boolean)
  async uploadFile(@Arg('file', () => GraphQLUpload)
  {
    createReadStream,
    filename,
  }: Upload): Promise<boolean> {
    return new Promise(async (res, rej) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../uploads/images/${filename}`))
        .on('finish', () => res(true))
        .on('error', () => rej(false)),
    );
  }
}
