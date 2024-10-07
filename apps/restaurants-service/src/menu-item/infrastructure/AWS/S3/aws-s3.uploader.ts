import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {ListBucketsCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AwsS3Uploader {
  s3Client: S3Client;
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async imageUploadToS3(fileName: string, mimetype: string, buffer: Buffer) {
    console.log(buffer, mimetype);
    const uuid = uuidv4();
    fileName =  `${uuid}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
      Key:  fileName,
      Body: buffer,
      ContentType: 'image/jpeg',
    });
    try {
      await this.s3Client.send(command);
      return `https://${this.configService.get('S3_BUCKET_NAME')}.s3.amazonaws.com/${fileName}`;
    } catch (e) {
      throw e;
    }
  }
}
