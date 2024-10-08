// 파일 업로드 처리를 위한 클래스
import { GraphQLRequest } from 'apollo-server-types';
import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class FileUploadDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request }: { request: GraphQLRequest }) {
    const { variables } = request;

    if (variables && variables.file) {
      const { createReadStream, filename, mimetype } =
        await variables.file.file;
      const chunks = [];
      for await (const chunk of createReadStream()) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      variables.file = {
        filename,
        mimetype,
        buffer: buffer.toString('base64'),
      };
    }
  }
}
