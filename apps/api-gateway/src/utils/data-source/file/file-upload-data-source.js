"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadDataSource = void 0;
const gateway_1 = require("@apollo/gateway");
class FileUploadDataSource extends gateway_1.RemoteGraphQLDataSource {
    async willSendRequest({ request }) {
        const { variables } = request;
        if (variables && variables.file) {
            const { createReadStream, filename, mimetype } = await variables.file.file;
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
exports.FileUploadDataSource = FileUploadDataSource;
//# sourceMappingURL=file-upload-data-source.js.map