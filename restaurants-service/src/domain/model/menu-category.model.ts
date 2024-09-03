export class MenuCategoryModel {
  private constructor(
    public readonly id: string,
    public readonly restaurantId: string,
    public readonly name: string,
  ) {}

  static create(
    id: string,
    restaurantId: string,
    name: string,
  ): MenuCategoryModel {
    return {
      id,
      restaurantId,
      name,
    };
  }
}
