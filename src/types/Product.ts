import type { CardItem } from '@/types/CardItem.ts'

export interface Product extends CardItem {
  stock: number,
  title: string
  imgUrl: string
  price: number
}
