import { Product } from "../product/product.model"

export interface CartItem {
    id: number,
    username: string,
    productId: number,
    product: Product,
    count: number
}