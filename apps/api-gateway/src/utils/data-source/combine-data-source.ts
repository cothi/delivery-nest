import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { AuthDataSource } from './token/auth-data-source';
import { FileUploadDataSource } from './file/file-upload-data-source';
import { GraphQLRequest } from 'apollo-server-types';

export class CombinedDataSource extends RemoteGraphQLDataSource {
  private authDataSource: AuthDataSource;
  private fileUploadDataSource: FileUploadDataSource;

  constructor(options: any) {
    super(options);
    this.authDataSource = new AuthDataSource(options);
    this.fileUploadDataSource = new FileUploadDataSource(options);
  }

  async willSendRequest(requestContext: {
    request: GraphQLRequest;
    context: any;
  }) {
    await this.authDataSource.willSendRequest(requestContext);
    await this.fileUploadDataSource.willSendRequest(requestContext);
  }
}
