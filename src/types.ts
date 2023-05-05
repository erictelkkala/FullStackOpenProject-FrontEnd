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
  user: User['name']
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

export interface NewOrderValues {
  orderItems: Item[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  totalPrice: number
}
