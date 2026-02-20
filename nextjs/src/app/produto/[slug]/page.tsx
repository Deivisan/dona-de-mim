import Image from 'next/image'
import Link from 'next/link'
import { categories, getProductBySlug, products, siteConfig } from '@/data/products'
import styles from './page.module.css'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Produto não encontrado</h1>
        <Link href="/" className="btn">
          Voltar para home
        </Link>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.category)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de saber mais sobre o produto ${product.name} (${product.sku}).`,
  )

  return (
    <>
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Início</Link>
          <span>›</span>
          {category && (
            <>
              <Link href={`/${category.slug}`}>{category.name}</Link>
              <span>›</span>
            </>
          )}
          <span>{product.name}</span>
        </div>
      </div>

      <section className={styles.productDetail}>
        <div className={styles.productGallery}>
          <div className={styles.productMainImage}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.productImg}
              priority
            />
          </div>
        </div>

        <div className={styles.productInfo}>
          <span className={styles.productCategoryTag}>{category?.name}</span>
          <h1>{product.name}</h1>
          <p className={styles.productSku}>SKU: {product.sku}</p>

          <div className={styles.productPrice}>
            {product.originalPrice && (
              <span className={styles.priceOriginal}>{formatPrice(product.originalPrice)}</span>
            )}
            <span className={product.originalPrice ? styles.pricePromo : styles.priceCurrent}>
              {formatPrice(product.price)}
            </span>
            {discount > 0 && <span className={styles.priceDiscount}>{discount}% OFF</span>}
          </div>

          <div className={styles.productSizes}>
            <span>Tamanhos disponíveis:</span>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <button key={size} className={styles.sizeBtn} type="button">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.productActions}>
            <a
              href={`https://wa.me/55${siteConfig.phone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.btnWhatsapp}`}
            >
              <i className="fab fa-whatsapp"></i> Comprar via WhatsApp
            </a>
          </div>

          <div className={styles.productDetailsTabs}>
            <details open>
              <summary>Descrição</summary>
              <div className={styles.tabContent}>
                <p>
                  {product.description ||
                    `Plus size ${product.name.toLowerCase()} da marca Dona De Mim. 
                  Peça exclusiva desenvolvida especialmente para valorizar suas curvas. 
                  Tecido de qualidade premium, corte moderno e acabamento perfeito.`}
                </p>
              </div>
            </details>
            <details>
              <summary>Cuidados com a peça</summary>
              <div className={styles.tabContent}>
                <ul>
                  <li>Lavar à mão com água fria</li>
                  <li>Não usar alvejante</li>
                  <li>Secar à sombra</li>
                  <li>Passar em temperatura média</li>
                </ul>
              </div>
            </details>
            <details>
              <summary>Envio e troca</summary>
              <div className={styles.tabContent}>
                <ul>
                  <li>Frete grátis para compras acima de R$ 299</li>
                  <li>Troca em até 30 dias</li>
                  <li>Primeira troca gratuit</li>
                  <li>Envio em até 3 dias úteis</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  )
}
