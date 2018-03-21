export interface Order {
    orderId: string;
    exchange: string;
    market: string;
    currency: string;
    price: number;
    volume: number;
    total: number;
    orderType: string;
}
