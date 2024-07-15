export class ShopSave {
  items: { id: number }[];
  user: { id: number };

  constructor(itemIds: number[], userId: number) {
    this.items = itemIds.map((id) => ({ id }));
    this.user = { id: userId };
  }
}
