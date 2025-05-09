import type { CardItem } from '@/types/CardItem.ts'

export interface Product extends CardItem {
  imgUrl: string
  stock: number
}
