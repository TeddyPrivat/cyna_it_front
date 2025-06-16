import type { Category } from '@/types/Category.ts'

export interface CardItem {
  id: number
  title: string
  description: string
  imgUrl: string,
  price: number,
  stock: number,
  categories: Array<Category>
}
