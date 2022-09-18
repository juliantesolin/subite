export class Item {
    title!: string;
    description!: string;
    quantity!: number;
    unit_price!: number;

    constructor(
        title : string,
        description : string,
        quantity : number,
        unit_price: number
        ) {
            this.title = title;
            this.description = description;
            this.quantity = quantity; 
            this.unit_price = unit_price; 
    }
}

export class BackUrls {
    success!: string;
    pending!: string;
    failure!: string;

    constructor(
        success : string,
        pending : string,
        failure: string
        ) {
            this.success = success;
            this.pending = pending; 
            this.failure = failure; 
    }
}

export class MercadoPagoRequest {
    auto_return: string;
    back_urls: BackUrls;
    items: Item[];

    constructor(
        auto_return : string,
        back_urls : BackUrls,
        items: Item[]
        ) {
        this.auto_return = auto_return;
        this.back_urls = back_urls; 
        this.items = items; 
    }
}