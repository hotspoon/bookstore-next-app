export interface Book {
  title: string
  author: string
  description: string
  price: string
  tag: string[]
  image: string
}

export interface BookResponse {
  items: BookV2[]
  totalItems: number
  currentPage: number
  totalPages: number
}

export interface Order {
  id: number
  customerId: number
  createdAt: string
  cancelled: boolean
}

export interface BookV2 {
  id: number
  title: string
  writer: string
  coverImage: string
  price: number
  stock: number
  createdAt: string
  tags: string[]
  orders: Order[]
}
