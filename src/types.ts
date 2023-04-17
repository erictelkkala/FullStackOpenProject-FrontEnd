export interface Item {
  id: string
  listing_title: string
  listing_price: number
  listing_quantity: number
  listing_description: string
  listing_image: string
  listing_category?: string
}

export interface CartQuantity {
  id: string
  quantity: number
}

export interface User {
  name: string
  password: string
}

export interface Order {
  id: string
  user: string
  orderItems: Item[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentResult: {
    id: string
    paymentStatus: string
    paymentTime: string
  }
  totalPrice: number
}
