
// Dona de Mim - App JS
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement
      const current = html.getAttribute('data-theme')
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
      themeToggle.innerHTML = current === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'
    })
  }

  // Search Modal
  const searchBtn = document.getElementById('searchBtn')
  const searchModal = document.getElementById('searchModal')
  const searchClose = document.getElementById('searchClose')

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.style.display = 'flex'
      document.getElementById('searchInput')?.focus()
    })

    searchClose?.addEventListener('click', () => {
      searchModal.style.display = 'none'
    })

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.style.display = 'none'
      }
    })
  }
})
