import { OrderHeader } from "../order-header/order-header.model";
import { Product } from "../product/product.model";

export interface OrderDetails {
    id: number,
    orderHeaderId: string,
    orderHeader: OrderHeader,
    productId: number,
    product: Product,
    count: number
}