export interface Product {
  id: number
  sku: string
  name: string
  slug: string
  category: 'blusas' | 'vestidos' | 'conjuntos' | 'shorts'
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  colors?: ProductColor[]
  sizes: string[]
  tag?: 'novo' | 'destaque' | 'promocao'
  description?: string
  details?: string[]
}

export interface ProductColor {
  name: string
  hex: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface SiteConfig {
  name: string
  description: string
  phone: string
  email?: string
  instagram: string
  address?: string
  founder: string
}
