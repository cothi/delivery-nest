export class RestaurantModel {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly address: string,
    public readonly name: string,
    public readonly phone: string,
  ) {}
}
