// ============================================
// DONA DE MIM - App JavaScript
// Frontend Client
// ============================================

// ============================================
// Theme Management (Dark Mode)
// ============================================

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeSettings = document.getElementById('themeSettings');
  const themeSelector = document.getElementById('themeSelector');
  const html = document.documentElement;
  const icon = themeToggle?.querySelector('i');

  // Load saved theme
  const savedTheme = localStorage.getItem('dona_de_mim_theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  updateThemeSelector(savedTheme);

  // Toggle theme button (cycles through themes)
  themeToggle?.addEventListener('click', () => {
    const themes = ['light', 'soft-dark', 'dark', 'ocean', 'rose', 'forest', 'sunset'];
    const currentTheme = html.getAttribute('data-theme');
    const currentIndex = themes.indexOf(currentTheme);
    const newTheme = themes[(currentIndex + 1) % themes.length];

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('dona_de_mim_theme', newTheme);
    updateThemeIcon(newTheme);
    updateThemeSelector(newTheme);
  });

  // Settings gear button
  themeSettings?.addEventListener('click', () => {
    themeSelector?.classList.toggle('active');
  });

  // Theme options
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      const newTheme = option.dataset.theme;
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('dona_de_mim_theme', newTheme);
      updateThemeIcon(newTheme);
      updateThemeSelector(newTheme);
      themeSelector?.classList.remove('active');
    });
  });

  // Close selector when clicking outside
  document.addEventListener('click', (e) => {
    if (themeSelector && !themeSelector.contains(e.target) && !themeSettings?.contains(e.target)) {
      themeSelector.classList.remove('active');
    }
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;

  if (theme === 'light' || theme === 'ocean' || theme === 'rose' || theme === 'forest' || theme === 'sunset') {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

function updateThemeSelector(theme) {
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.toggle('active', option.dataset.theme === theme);
  });
}

// ============================================
// Session Management
// ============================================

function getSessionId() {
  let sessionId = localStorage.getItem('dona_de_mim_session');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('dona_de_mim_session', sessionId);
  }
  return sessionId;
}

// Add session to all API requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const [url, options = {}] = args;
  
  // Add session header for API calls
  if (typeof url === 'string' && url.startsWith('/api/')) {
    options.headers = {
      ...options.headers,
      'x-session-id': getSessionId()
    };
  }
  
  return originalFetch.apply(this, [url, options]);
};

// ============================================
// Cart Functions
// ============================================

async function updateCartCount() {
  try {
    const response = await fetch('/api/cart');
    const data = await response.json();
    
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = data.count;
      el.style.display = data.count > 0 ? 'flex' : 'none';
    });
    
    return data.count;
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    return 0;
  }
}

async function addToCart(productId, tamanho, quantity = 1) {
  if (!tamanho) {
    alert('Por favor, selecione um tamanho!');
    return;
  }
  
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId()
      },
      body: JSON.stringify({
        productId,
        tamanho,
        quantity
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update cart count
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = data.count;
        el.style.display = 'flex';
      });
      
      // Show success message
      if (confirm('Produto adicionado ao carrinho! Deseja ir para o carrinho?')) {
        window.location.href = '/carrinho';
      }
    } else {
      alert(data.error || 'Erro ao adicionar ao carrinho');
    }
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    alert('Erro ao adicionar ao carrinho. Tente novamente.');
  }
}

async function removeFromCart(itemId) {
  try {
    const response = await fetch(`/api/cart/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        'x-session-id': getSessionId()
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Reload page to update cart
      window.location.reload();
    }
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
}

async function updateQuantity(itemId, quantity) {
  try {
    const response = await fetch(`/api/cart/item/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId()
      },
      body: JSON.stringify({ quantity })
    });
    
    const data = await response.json();
    
    if (data.success) {
      window.location.reload();
    }
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
  }
}

// ============================================
// Search Functions
// ============================================

function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  
  if (!searchBtn || !searchModal) return;
  
  searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    if (searchInput) searchInput.focus();
  });
  
  searchClose?.addEventListener('click', () => {
    searchModal.classList.remove('active');
  });
  
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });
  
  // Real-time search
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const query = e.target.value.trim();
      if (query.length < 2) return;
      
      try {
        const response = await fetch(`/api/busca?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        displaySearchResults(data.products);
      } catch (error) {
        console.error('Erro na busca:', error);
      }
    }, 300);
  });
}

function displaySearchResults(products) {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;
  
  if (products.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">Nenhum produto encontrado</p>';
    return;
  }
  
  resultsContainer.innerHTML = products.slice(0, 6).map(product => {
    const type = product.categoria === 'blusas' ? 'blusa' : 'vestido';
    const img = `/assets/imgs/${product.categoria}/${product.sku}-${type}.jpeg`;
    
    return `
      <a href="/produto/${product.slug}" class="search-result-item">
        <img src="${img}" alt="${product.nome}" />
        <div>
          <h4>${product.nome}</h4>
          <span>R$ ${product.preco_venda.toFixed(2)}</span>
        </div>
      </a>
    `;
  }).join('');
}

// ============================================
// Product Page Functions
// ============================================

function initProductPage() {
  // Size selection
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  // Quantity selector
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('quantity');
  
  qtyMinus?.addEventListener('click', () => {
    const current = parseInt(qtyInput.value) || 1;
    if (current > 1) {
      qtyInput.value = current - 1;
    }
  });
  
  qtyPlus?.addEventListener('click', () => {
    const current = parseInt(qtyInput.value) || 1;
    if (current < 10) {
      qtyInput.value = current + 1;
    }
  });
  
  // Add to cart button
  const addToCartBtn = document.getElementById('addToCart');
  addToCartBtn?.addEventListener('click', async () => {
    const productId = parseInt(addToCartBtn.dataset.productId);
    const selectedSize = document.querySelector('.size-btn.active');
    const tamanho = selectedSize ? parseInt(selectedSize.dataset.size) : null;
    const quantity = parseInt(qtyInput?.value || 1);
    
    await addToCart(productId, tamanho, quantity);
  });
}

// ============================================
// Cart Page Functions
// ============================================

function initCartPage() {
  // Remove buttons
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', async () => {
      const itemId = parseInt(btn.dataset.itemId);
      if (confirm('Remover este item do carrinho?')) {
        await removeFromCart(itemId);
      }
    });
  });
  
  // Quantity buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cartItem = btn.closest('.cart-item');
      if (!cartItem) return;
      const itemId = parseInt(cartItem.dataset.itemId);
      const qtySpan = cartItem.querySelector('.cart-item-qty span');
      let currentQty = parseInt(qtySpan.textContent);
      
      if (btn.dataset.action === 'increase') {
        currentQty++;
      } else if (btn.dataset.action === 'decrease' && currentQty > 1) {
        currentQty--;
      }
      
      await updateQuantity(itemId, currentQty);
    });
  });
  
  // Checkout form
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const customerName = formData.get('customerName');
    const customerPhone = formData.get('customerPhone');
    const customerEmail = formData.get('customerEmail');
    
    if (!customerName || !customerPhone) {
      alert('Por favor, preencha os dados obrigatórios!');
      return;
    }
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': getSessionId()
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to WhatsApp
        window.location.href = data.whatsappUrl;
      } else {
        alert(data.error || 'Erro ao processar pedido');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    }
  });
}

// ============================================
// Quick View Modal
// ============================================

function initQuickView() {
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const slug = btn.dataset.productSlug;
      window.location.href = `/produto/${slug}`;
    });
  });
}

// ============================================
// Category Page Filters
// ============================================

function initCategoryFilters() {
  const sortSelect = document.getElementById('sortProducts');
  const sizeFilters = document.querySelectorAll('.size-filter');
  const productsGrid = document.getElementById('productsGrid');

  if (!productsGrid) return;

  // Size filter
  sizeFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedSize = btn.dataset.size;
      filterProducts(selectedSize, sortSelect?.value || 'relevance');
    });
  });

  // Sort filter
  sortSelect?.addEventListener('change', () => {
    const selectedSize = document.querySelector('.size-filter.active')?.dataset.size || 'all';
    filterProducts(selectedSize, sortSelect.value);
  });
}

function filterProducts(size, sort) {
  const cards = document.querySelectorAll('.products-grid .product-card');
  
  cards.forEach(card => {
    const sizes = card.querySelector('.product-sizes-mini');
    const priceEl = card.querySelector('.price-current');
    let show = true;

    // Filter by size
    if (size !== 'all' && sizes) {
      const sizeText = sizes.textContent;
      if (!sizeText.includes(size.toString())) {
        show = false;
      }
    }

    card.style.display = show ? 'block' : 'none';
  });

  // Sort (simple implementation - would need real sorting logic)
  if (sort === 'price-asc' || sort === 'price-desc') {
    const products = Array.from(cards);
    products.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price-current')?.textContent.replace('R$ ', '') || 0);
      const priceB = parseFloat(b.querySelector('.price-current')?.textContent.replace('R$ ', '') || 0);
      return sort === 'price-asc' ? priceA - priceB : priceB - priceA;
    });

    const grid = document.querySelector('.products-grid');
    products.forEach(p => grid.appendChild(p));
  }
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initTheme();
  initSearch();
  initProductPage();
  initCartPage();
  initQuickView();
  initCategoryFilters();

  // Update cart count on load
  updateCartCount();

  console.log('💜 Dona de Mim - Cliente inicializado');
});
