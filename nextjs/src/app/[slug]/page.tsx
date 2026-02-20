import Link from 'next/link'
import ProductCard from '@/components/ProductCard/ProductCard'
import { categories, getProductsByCategory } from '@/data/products'
import styles from './page.module.css'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  const products = getProductsByCategory(slug)

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h1>Categoria não encontrada</h1>
        <Link href="/" className="btn">
          Voltar para home
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{category.name} Plus Size</h1>
        <p>{products.length} peças exclusivas esperando por você</p>
        <div className={styles.breadcrumb}>
          <Link href="/">Início</Link>
          <span>›</span>
          <span>{category.name} Plus Size</span>
        </div>
      </div>

      <section className={styles.products}>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
