"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedDataSource = void 0;
const gateway_1 = require("@apollo/gateway");
const auth_data_source_1 = require("./token/auth-data-source");
const file_upload_data_source_1 = require("./file/file-upload-data-source");
class CombinedDataSource extends gateway_1.RemoteGraphQLDataSource {
    constructor(options) {
        super(options);
        this.authDataSource = new auth_data_source_1.AuthDataSource(options);
        this.fileUploadDataSource = new file_upload_data_source_1.FileUploadDataSource(options);
    }
    async willSendRequest(requestContext) {
        await this.authDataSource.willSendRequest(requestContext);
        await this.fileUploadDataSource.willSendRequest(requestContext);
    }
}
exports.CombinedDataSource = CombinedDataSource;
//# sourceMappingURL=combine-data-source.js.map