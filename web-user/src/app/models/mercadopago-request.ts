export class Item {
    id!: string;
    title!: string;
    description!: string;
    quantity!: number;
    unit_price!: number;

    constructor(
        id: string,
        title : string,
        description : string,
        quantity : number,
        unit_price: number
        ) {
            this.id = id;
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

export class IdentificationRequest {
    type!: string;
    number!: string;

    constructor(
        type : string,
        number : string
        ) {
            this.type = type,
            this.number = number
    }
}

export class PreferencePayerRequest {
    name!: string;
    surname!: string;
    email!: string;
    identification!: IdentificationRequest

    constructor(
        name: string,
        surname: string,
        email: string,
        identification : IdentificationRequest
        ) {
            this.name = name;
            this.surname = surname; 
            this.email = email;
            this.identification = identification; 
    }
}

export class PreferencePaymentTypeRequest {
    id!: string;

    constructor(
        id : string
        ) {
            this.id = id
    }
}

export class PaymentMethods {
    installments: number;
    excluded_payment_types: PreferencePaymentTypeRequest[];

    constructor(
        installments : number,
        excluded_payment_types : PreferencePaymentTypeRequest[],
        ) {
            this.installments = installments;
            this.excluded_payment_types = excluded_payment_types; 
    }
}

export class MercadoPagoRequest {
    payer: PreferencePayerRequest;
    auto_return: string;
    back_urls: BackUrls;
    items: Item[];
    notification_url: string;
    external_reference: string;
    payment_methods: PaymentMethods;
    statement_descriptor: string;
    binary_mode: boolean

    constructor(
        payer : PreferencePayerRequest,
        auto_return : string,
        back_urls : BackUrls,
        items: Item[],
        notification_url: string,
        external_reference: string,
        payment_methods: PaymentMethods,
        statement_descriptor: string,
        binary_mode: boolean
        ) {
        this.payer = payer;
        this.auto_return = auto_return;
        this.back_urls = back_urls; 
        this.items = items; 
        this.notification_url = notification_url;
        this.external_reference = external_reference; 
        this.payment_methods = payment_methods; 
        this.statement_descriptor = statement_descriptor;
        this.binary_mode = binary_mode
    }
}