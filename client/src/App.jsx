import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">New Season</p>
          <h1>StudioThread</h1>
          <p className="subtext">A clean fashion storefront base you can grow into a full e-commerce experience.</p>
        </div>
      </header>

      <main>
        <section className="section-title">
          <h2>Featured Collection</h2>
        </section>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <section className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="actions">
                    <strong>${product.price}</strong>
                    <button>Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
