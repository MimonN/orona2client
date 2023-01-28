export interface OrderHeaderUpdate{
    shippingDate?: Date,
    note?: string,
    orderStatus: string,
    paymentStatus: string,
    carrier: string,
    trackingNumber: string
}