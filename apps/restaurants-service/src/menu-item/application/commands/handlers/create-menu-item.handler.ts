import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuItemCmd } from '../create-menu-item.command';
import { MenuCategoryService } from '../../../../menu-category/application/services/menu-category.service';
import { MenuCategoryModel } from '../../../../menu-category/domain/model/menu-category.model';
import { MenuItemService } from '../../services/menu-item.service';
import {AwsS3Uploader} from "../../../infrastructure/AWS/S3/aws-s3.uploader";

@Injectable()
@CommandHandler(CreateMenuItemCmd)
export class CreateMenuItemHandler implements ICommandHandler<CreateMenuItemCmd> {
  constructor(
  private readonly awsS3Uploader: AwsS3Uploader,
  private readonly menuItemService: MenuItemService) {}

  async execute(cmd: CreateMenuItemCmd): Promise<MenuCategoryModel> {
    const url = await this.awsS3Uploader.imageUploadToS3(cmd.file.filename, cmd.file.mimetype, Buffer.from(cmd.file.buffer, 'base64'));
    cmd.mainPhotoUrl = url;
    const model = this.menuItemService.createMenuItem(cmd);
    return model;
  }
}
