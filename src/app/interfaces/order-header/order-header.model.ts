export interface OrderHeader {
    id: string,
    username: string,
    orderDate: Date,
    shippingDate: Date,
    orderTotal: number,
    orderStatus: string,
    carrier: string,
    trackingNumber: string,
    name: string,
    email: string,
    phoneNumber: string,
    streetAddress: string,
    city: string,
    state: string,
    postalCode: string
}