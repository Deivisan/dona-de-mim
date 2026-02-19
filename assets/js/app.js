// ============================================
// DONA DE MIM - App JavaScript
// Frontend Client
// ============================================

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
  
  resultsContainer.innerHTML = products.slice(0, 6).map(product => `
    <a href="/produto/${product.slug}" class="search-result-item">
      <img src="/assets/imgs/produtos/${product.categoria}/${product.sku}-${product.slug}.jpeg" alt="${product.nome}" />
      <div>
        <h4>${product.nome}</h4>
        <span>R$ ${product.preco_venda.toFixed(2)}</span>
      </div>
    </a>
  `).join('');
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
      
      const productId = btn.dataset.productId;
      window.location.href = `/produto/${productId}`;
    });
  });
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initSearch();
  initProductPage();
  initCartPage();
  initQuickView();
  
  // Update cart count on load
  updateCartCount();
  
  console.log('💜 Dona de Mim - Cliente inicializado');
});
