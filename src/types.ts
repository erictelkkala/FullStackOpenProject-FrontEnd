export interface Item {
  id: string
  listing_title: string
  listing_price: number
  quantity: number
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
