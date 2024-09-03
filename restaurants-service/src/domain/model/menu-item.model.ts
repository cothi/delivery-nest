export class MenuItemModel {
  private constructor(
    private readonly id: string,
    private readonly mainPhotoUrl: string,
    private readonly menuCategoryId: string,
    private readonly restaurantId: string,
    private readonly name: string,
    private readonly price: number,
    private readonly description: string,
  ) {}
  static create(
    id: string,
    mainPhotoUrl: string,
    menuCategoryId: string,
    restaurantId: string,
    name: string,
    price: number,
    description: string,
  ): MenuItemModel {
    return new MenuItemModel(
      id,
      mainPhotoUrl,
      menuCategoryId,
      restaurantId,
      name,
      price,
      description,
    );
  }
}
