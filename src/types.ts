export enum Categories {
  Electronics = 'Electronics',
  Home = 'Home',
  Clothing = 'Clothing',
  Toys = 'Toys',
  Books = 'Books',
  Sports = 'Sports',
  Tools = 'Tools',
  Other = 'Other'
}

export interface Item {
  id: string
  listing_title: string
  listing_price: number
  listing_quantity: number
  listing_description: string
  listing_image: string
  listing_category: Categories
}

export interface NewOrderItem {
  item: Item['id']
  quantity: number
}

export interface OrderItem {
  item: Item
  quantity: number
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
  user: User['name']
  orderItems: NewOrderItem[]
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
  createdAt: number
}

export interface NewOrderValues {
  orderItems: NewOrderItem[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  totalPrice: number
}
