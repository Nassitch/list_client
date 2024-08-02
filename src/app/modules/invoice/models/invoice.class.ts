export class Invoice {

    private total: number;
    private marketId: number;
    private shopId: number;
    private userId: number;

    constructor(total: number, marketId: number, shopId: number, userId: number) {
        this.total = total;
        this.marketId = marketId;
        this.shopId = shopId;
        this.userId = userId;
    }

}