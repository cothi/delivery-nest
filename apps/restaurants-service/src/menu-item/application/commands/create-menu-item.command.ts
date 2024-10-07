import { ICommand } from '@nestjs/cqrs';
import {FileUpload} from "../../presentation/dto/create-menu-item.input";

export class CreateMenuItemCmd implements ICommand {
  constructor(
    public readonly menuCategoryId: string,
    public readonly restaurantId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly file: FileUpload,
    public mainPhotoUrl?: string,
  ) {}
}
