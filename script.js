const STORAGE_KEY = 'reviveListings';

const sampleListings = [
  {
    id: 'vintage-denim-jacket',
    title: 'Vintage Denim Jacket',
    brand: 'Levi\'s',
    description: 'Soft faded denim with an oversized fit, authentic wear, and sturdy hardware.',
    price: 68,
    category: 'Outerwear',
    size: 'M',
    condition: 'Excellent',
    color: 'Blue',
    seller: '@sarahstyle',
    sellerName: 'Sarah Flores',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'silk-slip-dress',
    title: 'Silk Slip Dress',
    brand: 'Reformation',
    description: 'Rich red silk slip dress with a clean bias cut and delicate straps.',
    price: 42,
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    color: 'Red',
    seller: '@sarahstyle',
    sellerName: 'Sarah Flores',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'wool-blend-trench',
    title: 'Wool Blend Trench',
    brand: 'COS',
    description: 'Neutral trench coat with warm lining, clean tailoring, and a relaxed drape.',
    price: 55,
    category: 'Outerwear',
    size: 'M',
    condition: 'Good',
    color: 'Beige',
    seller: '@marlowmarket',
    sellerName: 'Marlow Chen',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'leather-shoulder-bag',
    title: 'Leather Shoulder Bag',
    brand: 'Coach',
    description: 'Structured black shoulder bag with a polished clasp and minimal markings.',
    price: 74,
    category: 'Bags',
    size: 'One Size',
    condition: 'Excellent',
    color: 'Black',
    seller: '@noirarchive',
    sellerName: 'Noor Patel',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cashmere-cardigan',
    title: 'Cashmere Cardigan',
    brand: 'Everlane',
    description: 'Cream cashmere cardigan with a soft handfeel and ribbed trim.',
    price: 61,
    category: 'Tops',
    size: 'S',
    condition: 'Good',
    color: 'Cream',
    seller: '@sarahstyle',
    sellerName: 'Sarah Flores',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'satin-evening-dress',
    title: 'Satin Evening Dress',
    brand: 'Aritzia',
    description: 'Fluid satin midi dress with a subtle sheen and barely worn finish.',
    price: 86,
    category: 'Dresses',
    size: 'M',
    condition: 'New with tags',
    color: 'Champagne',
    seller: '@marlowmarket',
    sellerName: 'Marlow Chen',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'tailored-cream-trouser',
    title: 'Tailored Cream Trouser',
    brand: 'Theory',
    description: 'High-waisted trouser with a straight leg, pressed crease, and office-ready finish.',
    price: 38,
    category: 'Bottoms',
    size: 'L',
    condition: 'Excellent',
    color: 'Cream',
    seller: '@sarahstyle',
    sellerName: 'Sarah Flores',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'linen-button-shirt',
    title: 'Linen Button Shirt',
    brand: 'Uniqlo',
    description: 'Breathable white linen shirt with a relaxed cut and shell buttons.',
    price: 29,
    category: 'Tops',
    size: 'M',
    condition: 'Good',
    color: 'White',
    seller: '@noirarchive',
    sellerName: 'Noor Patel',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85',
  },
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function loadListings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const customListings = stored ? JSON.parse(stored) : [];
  return [...customListings, ...sampleListings];
}

function saveCustomListing(listing) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const listings = stored ? JSON.parse(stored) : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([listing, ...listings]));
}

function createListingCard(listing) {
  const card = document.createElement('article');
  card.className = 'product-tile listing-card';
  card.innerHTML = `
    <a href="listing.html?id=${listing.id}">
      <img src="${listing.image}" alt="${listing.title}" loading="lazy" />
    </a>
    <div class="product-tile-content listing-card-content">
      <a href="listing.html?id=${listing.id}"><h3>${listing.title}</h3></a>
      <p>${listing.brand} · ${listing.size} · ${listing.condition}</p>
      <div class="product-meta listing-meta">
        <span>$${listing.price}</span>
        <span>${listing.category}</span>
      </div>
    </div>
  `;
  return card;
}

function renderCardGrid(element, listings) {
  if (!element) return;
  element.innerHTML = '';
  listings.forEach((listing) => element.appendChild(createListingCard(listing)));
}

function initHome() {
  renderCardGrid(document.getElementById('productGrid'), loadListings().slice(0, 8));
}

function initCarousel() {
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!carouselSlides.length || !prevButton || !nextButton || !dotsContainer) return;

  let currentIndex = 0;
  let timerId;

  function updateCarousel(index) {
    carouselSlides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
    dotsContainer.querySelectorAll('button').forEach((dot, idx) => dot.classList.toggle('active', idx === index));
    currentIndex = index;
  }

  function restartTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => updateCarousel((currentIndex + 1) % carouselSlides.length), 7000);
  }

  carouselSlides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      updateCarousel(idx);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });

  prevButton.addEventListener('click', () => {
    updateCarousel((currentIndex - 1 + carouselSlides.length) % carouselSlides.length);
    restartTimer();
  });
  nextButton.addEventListener('click', () => {
    updateCarousel((currentIndex + 1) % carouselSlides.length);
    restartTimer();
  });

  updateCarousel(0);
  restartTimer();
}

function initSellForm() {
  const sellForm = document.getElementById('sellForm');
  if (!sellForm) return;

  const fields = {
    image: document.getElementById('productImage'),
    title: document.getElementById('productTitle'),
    brand: document.getElementById('productBrand'),
    description: document.getElementById('productDescription'),
    price: document.getElementById('productPrice'),
    category: document.getElementById('productCategory'),
    size: document.getElementById('productSize'),
    condition: document.getElementById('productCondition'),
    seller: document.getElementById('productSeller'),
  };
  const previewImage = document.getElementById('previewImage');
  const previewTitle = document.getElementById('previewTitle');
  const previewDescription = document.getElementById('previewDescription');
  const previewPrice = document.getElementById('previewPrice');
  const previewCategory = document.getElementById('previewCategory');
  const formMessage = document.getElementById('formMessage');
  let imageData = '';

  function updatePreview() {
    previewTitle.textContent = fields.title.value.trim() || 'Item title';
    previewDescription.textContent = fields.description.value.trim() || 'Description appears here.';
    previewPrice.textContent = fields.price.value ? `$${fields.price.value}` : '$0';
    previewCategory.textContent = fields.category.value || 'Category';
  }

  fields.image.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      imageData = '';
      previewImage.style.backgroundImage = '';
      previewImage.textContent = 'Upload a photo to preview';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      imageData = reader.result;
      previewImage.style.backgroundImage = `url('${imageData}')`;
      previewImage.textContent = '';
    };
    reader.readAsDataURL(file);
  });

  Object.values(fields).forEach((field) => {
    if (field && field !== fields.image) field.addEventListener('input', updatePreview);
  });

  sellForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!imageData) {
      formMessage.textContent = 'Please upload a photo for your listing.';
      return;
    }

    const title = fields.title.value.trim();
    const listing = {
      id: `${slugify(title)}-${Date.now()}`,
      title,
      brand: fields.brand.value.trim(),
      description: fields.description.value.trim(),
      price: Number(fields.price.value),
      category: fields.category.value,
      size: fields.size.value,
      condition: fields.condition.value,
      color: 'Neutral',
      seller: fields.seller.value.trim(),
      sellerName: fields.seller.value.trim().replace('@', '') || 'Pathway Seller',
      image: imageData,
    };

    saveCustomListing(listing);
    sellForm.reset();
    imageData = '';
    previewImage.style.backgroundImage = '';
    previewImage.textContent = 'Upload a photo to preview';
    updatePreview();
    formMessage.textContent = 'Listing added. It will appear in Freshly Listed and Shop.';
    setTimeout(() => (formMessage.textContent = ''), 3600);
  });

  updatePreview();
}

function initShop() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return;

  const listings = loadListings();
  const listingCount = document.getElementById('listingCount');
  const categorySelect = document.getElementById('filterCategory');
  const sizeSelect = document.getElementById('filterSize');
  const sortSelect = document.getElementById('shopSort');
  const searchInputs = [document.getElementById('shopSearch'), document.getElementById('shopSearchInput')].filter(Boolean);
  const filters = {
    brand: document.getElementById('filterBrand'),
    condition: document.getElementById('filterCondition'),
    color: document.getElementById('filterColor'),
  };

  [...new Set(listings.map((item) => item.category))].sort().forEach((category) => {
    categorySelect.insertAdjacentHTML('beforeend', `<option value="${category}">${category}</option>`);
  });
  [...new Set(listings.map((item) => item.size))].sort().forEach((size) => {
    sizeSelect.insertAdjacentHTML('beforeend', `<option value="${size}">${size}</option>`);
  });

  function renderShop() {
    const query = (searchInputs[0]?.value || searchInputs[1]?.value || '').toLowerCase();
    let filtered = listings.filter((item) => {
      const searchable = `${item.title} ${item.brand} ${item.category} ${item.description}`.toLowerCase();
      return searchable.includes(query)
        && (categorySelect.value === 'all' || item.category === categorySelect.value)
        && (sizeSelect.value === 'all' || item.size === sizeSelect.value)
        && (filters.condition.value === 'all' || item.condition === filters.condition.value)
        && item.brand.toLowerCase().includes(filters.brand.value.toLowerCase())
        && item.color.toLowerCase().includes(filters.color.value.toLowerCase());
    });

    if (sortSelect.value === 'priceLow') filtered = filtered.sort((a, b) => a.price - b.price);
    if (sortSelect.value === 'priceHigh') filtered = filtered.sort((a, b) => b.price - a.price);
    renderCardGrid(shopGrid, filtered);
    listingCount.textContent = filtered.length;
  }

  [categorySelect, sizeSelect, sortSelect, filters.brand, filters.condition, filters.color, ...searchInputs].forEach((control) => {
    control.addEventListener('input', renderShop);
    control.addEventListener('change', renderShop);
  });

  document.getElementById('clearFilters')?.addEventListener('click', () => {
    categorySelect.value = 'all';
    sizeSelect.value = 'all';
    filters.condition.value = 'all';
    filters.brand.value = '';
    filters.color.value = '';
    searchInputs.forEach((input) => (input.value = ''));
    sortSelect.value = 'newest';
    renderShop();
  });

  renderShop();
}

function initListingDetail() {
  const listingContent = document.getElementById('listingContent');
  if (!listingContent) return;

  const listings = loadListings();
  const params = new URLSearchParams(window.location.search);
  const listing = listings.find((item) => item.id === params.get('id')) || listings[1];
  listingContent.innerHTML = `
    <img class="listing-photo" src="${listing.image}" alt="${listing.title}" />
    <article class="listing-detail">
      <p class="eyebrow">${listing.brand}</p>
      <h1>${listing.title}</h1>
      <p class="listing-price">$${listing.price}</p>
      <p>${listing.description}</p>
      <div class="detail-list">
        <div><span>Category</span><strong>${listing.category}</strong></div>
        <div><span>Size</span><strong>${listing.size}</strong></div>
        <div><span>Condition</span><strong>${listing.condition}</strong></div>
        <div><span>Seller</span><strong><a href="profile.html?seller=${encodeURIComponent(listing.seller)}">${listing.seller}</a></strong></div>
      </div>
      <a class="button button-primary" href="profile.html?seller=${encodeURIComponent(listing.seller)}">View Seller Profile</a>
    </article>
  `;

  const similar = listings.filter((item) => item.id !== listing.id && item.category === listing.category).slice(0, 4);
  renderCardGrid(document.getElementById('similarGrid'), similar.length ? similar : listings.filter((item) => item.id !== listing.id).slice(0, 4));
}

function initProfile() {
  const sellerListings = document.getElementById('sellerListings');
  if (!sellerListings) return;

  const listings = loadListings();
  const params = new URLSearchParams(window.location.search);
  const sellerHandle = params.get('seller') || '@sarahstyle';
  const sellerItems = listings.filter((item) => item.seller === sellerHandle);
  const seller = sellerItems[0] || listings[0];

  document.getElementById('sellerName').textContent = seller.seller;
  document.getElementById('sellerBio').textContent = `${seller.sellerName} curates premium pre-owned pieces with a focus on modern editorial style.`;
  document.getElementById('statItems').textContent = sellerItems.length || 1;
  renderCardGrid(sellerListings, sellerItems.length ? sellerItems : [seller]);
}

initHome();
initCarousel();
initSellForm();
initShop();
initListingDetail();
initProfile();
