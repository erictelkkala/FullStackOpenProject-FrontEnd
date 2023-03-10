export interface Item {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  image: string
  category?: string
}

export interface LoginValues {
  username: string
  password: string
}
