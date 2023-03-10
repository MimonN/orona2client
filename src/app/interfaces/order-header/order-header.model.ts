export interface OrderHeader {
    id: string,
    username: string,
    orderDate: Date,
    updateTime: Date,
    shippingDate: Date,
    orderTotal: number,
    orderStatus: string,
    paymentStatus: string,
    carrier: string,
    trackingNumber: string,
    note: string,
    name: string,
    email: string,
    phoneNumber: string,
    streetAddress: string,
    city: string,
    state: string,
    postalCode: string
}