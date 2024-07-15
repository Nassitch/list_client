export class ShopEdit {
    items: { id: number }[];
    userId: number;
  
    constructor(itemIds: number[], userId: number) {
      this.items = itemIds.map((id) => ({ id }));
      this.userId = userId;
    }
  }
  