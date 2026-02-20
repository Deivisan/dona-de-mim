import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function getTagLabel(tag?: string): string {
  switch (tag) {
    case 'novo':
      return 'Novo'
    case 'destaque':
      return 'Destaque'
    case 'promocao':
      return 'Promoção'
    default:
      return ''
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`} className={styles.productCard}>
      <div className={styles.productImage}>
        {product.tag && <span className={styles.productTag}>{getTagLabel(product.tag)}</span>}
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={styles.productImg}
          />
        </div>
      </div>
      <div className={styles.productInfo}>
        <h4>{product.name}</h4>
        <div className={styles.priceWrapper}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
          )}
          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </Link>
  )
}
