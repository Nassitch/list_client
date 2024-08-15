import { Invoice } from "../../invoice/models/invoice.class";

export interface MarketResponse {
    id: number;
    name: string;
    size: string;
    picture: string;
    invoices: Invoice[] | null
}