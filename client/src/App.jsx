import { useEffect, useMemo, useState } from 'react';

const brandName = 'Reverie';

const navLinks = [
  { label: 'Shop', path: '/shop' },
  { label: 'Sell', path: '/sell' },
  { label: 'Categories', path: '/shop' },
];

const navActions = [
  { label: 'Wishlist', path: '/shop' },
  { label: 'Bag', path: '/shop' },
  { label: 'Sign In', path: '/shop' },
];

const categoryChips = [
  'Women',
  'Men',
  'Outerwear',
  'Tops',
  'Dresses',
  'Bottoms',
  'Shoes',
  'Bags',
  'Accessories',
  'Sale',
];

const benefitCards = [
  { title: 'Sustainable Fashion', detail: 'Shop curated pieces that breathe new life into wardrobes.' },
  { title: 'Buyer Protection', detail: 'Trust every purchase with secure checkout and polished support.' },
  { title: 'Great Prices', detail: 'Discover premium resale finds at irresistibly low prices.' },
  { title: 'Community Driven', detail: 'A marketplace built for independent sellers and mindful shoppers.' },
];

const fallbackItems = [
  {
    id: 101,
    name: 'Silk Slip Dress',
    brand: 'Luna Atelier',
    price: 42,
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    description: 'Timeless silk with an editorial drape and understated glamour.',
    image: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" rx="36" fill="#b2a194"/><rect x="32" y="32" width="836" height="1136" rx="32" fill="rgba(255,255,255,0.12)"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#f9f5f0" font-family="Georgia, serif" font-size="52">Silk Slip Dress</text><text x="50%" y="68%" dominant-baseline="middle" text-anchor="middle" fill="#ebdfd2" font-family="Inter, sans-serif" font-size="24">Editorial elegance</text></svg>`),
    images: [],
    seller: 'Reverie Collective',
    listedAt: 'Just listed',
  },
  {
    id: 102,
    name: 'Vintage Denim Jacket',
    brand: 'Found & Found',
    price: 68,
    category: 'Outerwear',
    size: 'M',
    condition: 'Very Good',
    description: 'A lived-in classic with a refined silhouette and cool attitude.',
    image: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" rx="36" fill="#50616c"/><rect x="32" y="32" width="836" height="1136" rx="32" fill="rgba(255,255,255,0.12)"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#f9f5f0" font-family="Georgia, serif" font-size="48">Vintage Denim Jacket</text><text x="50%" y="67%" dominant-baseline="middle" text-anchor="middle" fill="#d8d8d1" font-family="Inter, sans-serif" font-size="24">Timeless layering</text></svg>`),
    images: [],
    seller: 'Reverie Collective',
    listedAt: 'Just listed',
  },
  {
    id: 103,
    name: 'Wool Blend Trench',
    brand: 'Noir Atelier',
    price: 55,
    category: 'Outerwear',
    size: 'L',
    condition: 'Excellent',
    description: 'Structured tailoring with soft wool tones for elevated everyday wear.',
    image: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" rx="36" fill="#c6b09b"/><rect x="32" y="32" width="836" height="1136" rx="32" fill="rgba(255,255,255,0.12)"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#312a24" font-family="Georgia, serif" font-size="48">Wool Blend Trench</text><text x="50%" y="67%" dominant-baseline="middle" text-anchor="middle" fill="#4d453f" font-family="Inter, sans-serif" font-size="24">Soft structure, crisp feel</text></svg>`),
    images: [],
    seller: 'Reverie Collective',
    listedAt: 'Just listed',
  },
  {
    id: 104,
    name: 'Cashmere Funnel Neck',
    brand: 'Maison Ren',
    price: 89,
    category: 'Knitwear',
    size: 'M',
    condition: 'Like New',
    description: 'Cloud-soft knit in a warm neutral tone for quiet luxury styling.',
    image: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" rx="36" fill="#d4c7b6"/><rect x="32" y="32" width="836" height="1136" rx="32" fill="rgba(255,255,255,0.12)"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#3f362f" font-family="Georgia, serif" font-size="48">Cashmere Funnel Neck</text><text x="50%" y="69%" dominant-baseline="middle" text-anchor="middle" fill="#726557" font-family="Inter, sans-serif" font-size="24">Refined essentials</text></svg>`),
    images: [],
    seller: 'Reverie Collective',
    listedAt: 'Just listed',
  },
  {
    id: 105,
    name: 'Leather Mini Bag',
    brand: 'Urban Loom',
    price: 120,
    category: 'Accessories',
    size: 'One Size',
    condition: 'Excellent',
    description: 'Compact, luxe accessory shaped for daily edit-worthy wear.',
    image: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" rx="36" fill="#6b625a"/><rect x="32" y="32" width="836" height="1136" rx="32" fill="rgba(255,255,255,0.12)"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#f9f4ee" font-family="Georgia, serif" font-size="48">Leather Mini Bag</text><text x="50%" y="69%" dominant-baseline="middle" text-anchor="middle" fill="#d2c8c0" font-family="Inter, sans-serif" font-size="24">Polished finishing touch</text></svg>`),
    images: [],
    seller: 'Reverie Collective',
    listedAt: 'Just listed',
  },
];

const categories = ['All', 'Women', 'Men', 'Outerwear', 'Tops', 'Dresses', 'Bottoms', 'Shoes', 'Bags', 'Accessories', 'Knitwear'];

function parseRoute(pathname) {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean.startsWith('/listing/')) {
    const id = clean.replace('/listing/', '');
    return { page: 'listing', id };
  }
  if (clean === '/sell') {
    return { page: 'sell' };
  }
  if (clean === '/shop') {
    return { page: 'shop' };
  }
  return { page: 'home' };
}

function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));
  const [products, setProducts] = useState([]);
  const [savedItems, setSavedItems] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('reverie-saved-items') || '[]');
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sellAlert, setSellAlert] = useState('');

  const marketplaceItems = useMemo(() => {
    const loaded = products.map((product) => ({
      ...product,
      brand: product.brand || 'Reverie Workshop',
      size: product.size || 'M',
      condition: product.condition || 'Very Good',
      images: product.images || [product.image],
      seller: product.seller || 'Reverie Collective',
      listedAt: product.listedAt || 'Recently listed',
    }));
    return [...savedItems, ...(loaded.length ? loaded : fallbackItems)];
  }, [products, savedItems]);

  const heroItems = useMemo(() => {
    return marketplaceItems.length >= 3 ? marketplaceItems.slice(0, 3) : fallbackItems.slice(0, 3);
  }, [marketplaceItems]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return marketplaceItems.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      if (!normalizedSearch) {
        return true;
      }
      return [item.name, item.brand, item.category, item.description].some((field) =>
        String(field).toLowerCase().includes(normalizedSearch)
      );
    });
  }, [marketplaceItems, activeCategory, searchTerm]);

  const activeListing = useMemo(() => {
    if (route.page !== 'listing') return null;
    return marketplaceItems.find((item) => String(item.id) === String(route.id));
  }, [marketplaceItems, route]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('reverie-saved-items', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    const handlePop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(parseRoute(path));
  };

  const publishListing = (listing) => {
    const listingId = Date.now();
    setSavedItems((prev) => [{ ...listing, id: listingId }, ...prev]);
    setSellAlert('Your listing is live and visible in the marketplace.');
    navigate(`/listing/${listingId}`);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category === 'Sale' ? 'All' : category);
    navigate('/shop');
  };

  const pageContent = () => {
    if (route.page === 'shop') {
      return (
        <ShopPage
          items={filteredItems}
          loading={loading}
          searchTerm={searchTerm}
          onSearch={(value) => setSearchTerm(value)}
          activeCategory={activeCategory}
          onCategoryChange={(category) => setActiveCategory(category)}
          onSelectItem={(id) => navigate(`/listing/${id}`)}
        />
      );
    }

    if (route.page === 'sell') {
      return <SellPage onPublish={publishListing} alert={sellAlert} />;
    }

    if (route.page === 'listing') {
      return <ListingPage item={activeListing} onBack={() => navigate('/shop')} />;
    }

    return (
      <HomePage
        heroItems={heroItems}
        benefitCards={benefitCards}
        listings={marketplaceItems}
        loading={loading}
        onShop={() => navigate('/shop')}
        onSell={() => navigate('/sell')}
        onItemClick={(id) => navigate(`/listing/${id}`)}
        onCategorySelect={handleCategoryClick}
      />
    );
  };

  return (
    <div className="app-shell">
      <Header
        onNavigate={navigate}
        onCategorySelect={handleCategoryClick}
        navLinks={navLinks}
        navActions={navActions}
        brandName={brandName}
        onSearch={(value) => {
          setSearchTerm(value);
          if (route.page !== 'shop') navigate('/shop');
        }}
      />
      <main>{pageContent()}</main>
      <footer className="footer-bar">
        <p>{brandName} is a peer-to-peer marketplace for buying and selling curated clothing.</p>
      </footer>
    </div>
  );
}

function Header({ onNavigate, onCategorySelect, navLinks, navActions, brandName, onSearch }) {
  return (
    <header className="site-header">
      <div className="header-top">
        <button className="brand-mark" onClick={() => onNavigate('/') }>{brandName}</button>
        <nav className="top-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button key={link.label} className="nav-link" onClick={() => onNavigate(link.path)}>
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="search-pill">
            <input
              type="search"
              placeholder="Search for items, brands, or styles"
              aria-label="Search listings"
              onChange={(event) => onSearch(event.target.value)}
            />
            <span className="search-icon">⌕</span>
          </div>
          {navActions.map((action) => (
            <button key={action.label} className="icon-button" onClick={() => onNavigate(action.path)}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
      <div className="category-strip" aria-label="Category navigation">
        {categoryChips.map((label) => (
          <button key={label} className="category-chip" onClick={() => onCategorySelect(label)}>
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

function HomePage({ heroItems, benefitCards, listings, loading, onShop, onSell, onItemClick, onCategorySelect }) {
  return (
    <>
      <section className="hero-grid">
        <article className="hero-panel hero-panel--small">
          <img src={heroItems[0]?.image} alt={heroItems[0]?.name} />
          <div className="panel-copy panel-copy--side">
            <span>New Arrival</span>
            <h2>{heroItems[0]?.name}</h2>
            <p>${heroItems[0]?.price}</p>
          </div>
        </article>

        <article className="hero-panel hero-panel--center">
          <img src={heroItems[1]?.image} alt={heroItems[1]?.name} />
          <div className="panel-copy panel-copy--center">
            <span>Featured Item</span>
            <h1>{heroItems[1]?.name}</h1>
            <p>{heroItems[1]?.description}</p>
            <div className="hero-meta">
              <strong>${heroItems[1]?.price}</strong>
              <button className="primary-button" onClick={() => onItemClick(heroItems[1]?.id)}>
                View Details
              </button>
            </div>
          </div>
        </article>

        <article className="hero-panel hero-panel--small hero-panel--right">
          <img src={heroItems[2]?.image} alt={heroItems[2]?.name} />
          <div className="panel-copy panel-copy--side">
            <span>Styled Edit</span>
            <h2>{heroItems[2]?.name}</h2>
            <p>${heroItems[2]?.price}</p>
          </div>
        </article>
      </section>

      <section className="overview-strip">
        <div className="overview-copy">
          <p>Discover conscious closet finds curated for a premium resale experience.</p>
          <button className="secondary-button" onClick={onShop}>Browse the Market</button>
        </div>
      </section>

      <section className="benefits-grid">
        {benefitCards.map((benefit) => (
          <article key={benefit.title} className="benefit-card">
            <h3>{benefit.title}</h3>
            <p>{benefit.detail}</p>
          </article>
        ))}
      </section>

      <section className="listing-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Freshly listed</p>
            <h2>Marketplace finds</h2>
          </div>
          <button className="text-button" onClick={onShop}>View all</button>
        </div>
        {loading ? (
          <p>Loading curated finds...</p>
        ) : (
          <div className="product-grid">
            {listings.slice(0, 8).map((item) => (
              <ProductCard key={item.id} item={item} onSelect={() => onItemClick(item.id)} />
            ))}
          </div>
        )}
      </section>

      <section className="category-highlight">
        <div>
          <p className="eyebrow">Sell your pieces</p>
          <h2>Turn your wardrobe into a marketplace listing.</h2>
          <p>Upload photos, share details, and connect with shoppers who value quality and style.</p>
          <button className="primary-button" onClick={onSell}>Start selling now</button>
        </div>
        <div className="category-grid">
          {['Shift dresses', 'Leather outerwear', 'Premium knitwear', 'Accessories'].map((label) => (
            <div key={label} className="category-card">{label}</div>
          ))}
        </div>
      </section>
    </>
  );
}

function ShopPage({ items, loading, searchTerm, onSearch, activeCategory, onCategoryChange, onSelectItem }) {
  return (
    <div className="shop-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Shop</p>
          <h2>Curated resale wardrobe</h2>
        </div>
        <div className="shop-filters">
          <input
            className="search-input"
            type="search"
            value={searchTerm}
            placeholder="Search items, brands, styles"
            aria-label="Search listings"
            onChange={(event) => onSearch(event.target.value)}
          />
          <div className="filter-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${activeCategory === category ? 'filter-chip--active' : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading listings...</p>
      ) : (
        <div className="product-grid">
          {items.length ? (
            items.map((item) => <ProductCard key={item.id} item={item} onSelect={() => onSelectItem(item.id)} />)
          ) : (
            <div className="empty-state">
              <p>No listings matched your search. Try another category or keyword.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SellPage({ onPublish, alert }) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Women');
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState('Excellent');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).slice(0, 4);
    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    const loaded = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      loaded.push({ src, name: file.name });
    }
    setImages((prev) => [...prev, ...loaded].slice(0, 6));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !brand || !description || !price) {
      setError('All fields are required to publish your listing.');
      return;
    }
    if (!images.length) {
      setError('Please upload at least one photo for your listing.');
      return;
    }
    const listing = {
      name: title,
      brand,
      category,
      size,
      condition,
      description,
      price: Number(price),
      image: images[0].src,
      images: images.map((item) => item.src),
      seller: 'Your Closet',
      listedAt: 'Just listed',
    };
    onPublish(listing);
    setError('');
  };

  return (
    <section className="sell-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Sell</p>
          <h2>List your wardrobe with ease.</h2>
        </div>
      </div>
      <div className="sell-layout">
        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vintage silk dress" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Zara, Gucci" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.filter((c) => c !== 'All').map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input id="size" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. M, 8, One Size" />
            </div>
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)}>
                {['New', 'Excellent', 'Very Good', 'Good'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe the item, fit, and any wear." />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 65" />
          </div>
          <div className="form-group upload-group" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
            <label>Photos</label>
            <p>Drag and drop up to 6 images, or click to select.</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => handleFiles(Array.from(event.target.files || []))}
            />
            <div className="upload-preview">
              {images.map((image, index) => (
                <div key={`${image.name}-${index}`} className="preview-thumb">
                  <img src={image.src} alt={image.name} />
                </div>
              ))}
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          {alert && <p className="form-success">{alert}</p>}
          <button type="submit" className="primary-button">Publish listing</button>
        </form>
        <aside className="sell-sideboard">
          <div className="info-panel">
            <h3>What makes a strong listing?</h3>
            <ul>
              <li>Use clear photos that show details and fit.</li>
              <li>Pick accurate sizes and honest condition notes.</li>
              <li>Set a price that reflects quality and demand.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ListingPage({ item, onBack }) {
  if (!item) {
    return (
      <div className="detail-page detail-page--empty">
        <p>We couldn't find that listing.</p>
        <button className="secondary-button" onClick={onBack}>Browse listings</button>
      </div>
    );
  }

  return (
    <section className="detail-page">
      <button className="text-button" onClick={onBack}>&larr; Back to shop</button>
      <div className="detail-grid">
        <div className="detail-gallery">
          {item.images?.length > 1 ? (
            <div className="gallery-grid">
              {item.images.map((src, index) => (
                <img key={`${item.id}-${index}`} src={src} alt={`${item.name} ${index + 1}`} />
              ))}
            </div>
          ) : (
            <img src={item.image} alt={item.name} className="detail-main-image" />
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="listing-brand">{item.brand}</p>
          <p className="detail-price">${item.price}</p>
          <div className="attribute-list">
            <span>{item.size}</span>
            <span>{item.condition}</span>
            <span>{item.seller}</span>
          </div>
          <p className="detail-description">{item.description}</p>
          <div className="detail-actions">
            <button className="primary-button">Add to bag</button>
            <button className="secondary-button">Add to wishlist</button>
          </div>
          <div className="listing-summary">
            <p><strong>Listed:</strong> {item.listedAt}</p>
            <p><strong>Category:</strong> {item.category}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, onSelect }) {
  return (
    <article className="product-card" onClick={onSelect}>
      <div className="product-image-wrap">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="product-details">
        <span className="category">{item.brand}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="actions">
          <strong>${item.price}</strong>
          <button type="button">View</button>
        </div>
      </div>
    </article>
  );
}

export default App;
