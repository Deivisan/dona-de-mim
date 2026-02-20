import Link from 'next/link'
import ProductCard from '@/components/ProductCard/ProductCard'
import { categories, getNewProducts } from '@/data/products'
import styles from './page.module.css'

export default function Home() {
  const newProducts = getNewProducts()

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Moda Plus Size</p>
          <h1>
            Realçando As Curvas <span>De Quem É</span> Dona De Si
          </h1>
          <p className={styles.heroTagline}>Moda Para Mulheres Reais ❤️</p>
          <span className={styles.heroSizes}>Do 46 ao 54</span>
          <br />
          <br />
          <Link href="/blusas" className="btn">
            Ver Coleção
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} id="sobre">
        <div className={styles.aboutContent}>
          <h2>
            Bem-vinda à <span>Dona De Mim</span>
          </h2>
          <p>
            Somos uma marca feita para mulheres reais, que celebra a diversidade e a beleza de cada
            corpo. Nossa missão é realçar suas curvas com peças exclusivas, modernas e cheias de
            estilo. Do 46 ao 54, aqui você encontra moda que te representa. <strong>A DONA</strong>{' '}
            é quem decide o que usar. ❤️
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories} id="colecoes">
        <h2 className="section-title">Nossas Coleções</h2>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`} className={styles.categoryLink}>
              <div className={styles.categoryCard}>
                <div
                  className={styles.categoryImage}
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryInfo}>
                    <h3>{category.name}</h3>
                    <span>Ver coleção</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.products} id="novidades">
        <h2 className="section-title">Novidades</h2>
        <div className={styles.productsGrid}>
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          <i className="fas fa-shipping-fast"></i>
          <h4>Frete Grátis</h4>
          <p>Frete grátis para pedidos acima de R$ 299</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-undo"></i>
          <h4>Troca Fácil</h4>
          <p>Troca em até 30 dias</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-lock"></i>
          <h4>Compra Segura</h4>
          <p>Seus dados protegidos</p>
        </div>
        <div className="feature-item">
          <i className="fab fa-whatsapp"></i>
          <h4>Atendimento</h4>
          <p>Seg. a sáb., 9h às 19h</p>
        </div>
      </section>
    </>
  )
}
