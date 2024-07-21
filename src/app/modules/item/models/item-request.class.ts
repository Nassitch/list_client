export class ItemRequest {
    
    private name: string;
    private category: { id: number};

    public constructor(id: number, name: string) {
        this.name = name;
        this.category = { id: id };
    }
}