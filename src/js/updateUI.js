// UI update and animation utilities
class UIManager {
  constructor() {
    this.animationDuration = 300
    this.toastContainer = null
    this.initializeToastContainer()
  }

  // Initialize toast container
  initializeToastContainer() {
    this.toastContainer = document.createElement("div")
    this.toastContainer.id = "toast-container"
    this.toastContainer.className = "fixed top-4 right-4 z-50 space-y-2"
    document.body.appendChild(this.toastContainer)
  }

  // Show loading state
  showLoading(element, text = "Loading...") {
    if (typeof element === "string") {
      element = document.getElementById(element)
    }

    if (element) {
      element.innerHTML = `
                <div class="flex items-center justify-center p-8">
                    <div class="loading loading-spinner loading-lg mr-4"></div>
                    <span class="text-lg">${text}</span>
                </div>
            `
    }
  }

  // Hide loading state
  hideLoading(element) {
    if (typeof element === "string") {
      element = document.getElementById(element)
    }

    if (element) {
      element.style.display = "none"
    }
  }

  // Show toast notification
  showToast(message, type = "info", duration = 3000) {
    const toast = document.createElement("div")
    const toastId = "toast-" + Date.now()
    toast.id = toastId

    const typeClasses = {
      success: "alert-success",
      error: "alert-error",
      warning: "alert-warning",
      info: "alert-info",
    }

    const icons = {
      success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
      error: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
      warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />`,
      info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    }

    toast.className = `alert ${typeClasses[type]} shadow-lg animate-slide-in max-w-sm`
    toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                ${icons[type]}
            </svg>
            <span>${message}</span>
            <button class="btn btn-sm btn-ghost" onclick="this.parentElement.remove()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `

    this.toastContainer.appendChild(toast)

    // Auto remove after duration
    setTimeout(() => {
      const toastElement = document.getElementById(toastId)
      if (toastElement) {
        toastElement.style.animation = "slideOut 0.3s ease-in forwards"
        setTimeout(() => toastElement.remove(), 300)
      }
    }, duration)
  }

  // Animate element entrance
  animateIn(element, animationType = "fadeInUp") {
    if (typeof element === "string") {
      element = document.getElementById(element)
    }

    if (element) {
      element.classList.add(`animate-${animationType}`)
    }
  }

  // Animate element exit
  animateOut(element, animationType = "fadeOut") {
    if (typeof element === "string") {
      element = document.getElementById(element)
    }

    if (element) {
      element.classList.add(`animate-${animationType}`)
      setTimeout(() => {
        element.style.display = "none"
      }, this.animationDuration)
    }
  }

  // Update cart badge with animation
  updateCartBadge(count) {
    const badges = document.querySelectorAll("#cart-count")
    badges.forEach((badge) => {
      badge.textContent = count
      badge.classList.add("cart-badge-animate")
      setTimeout(() => {
        badge.classList.remove("cart-badge-animate")
      }, this.animationDuration)
    })
  }

  // Smooth scroll to element
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  // Toggle element visibility
  toggleElement(element, show = null) {
    if (typeof element === "string") {
      element = document.getElementById(element)
    }

    if (element) {
      if (show === null) {
        element.classList.toggle("hidden")
      } else {
        if (show) {
          element.classList.remove("hidden")
        } else {
          element.classList.add("hidden")
        }
      }
    }
  }

  // Create modal
  createModal(title, content, actions = []) {
    const modal = document.createElement("div")
    modal.className = "modal modal-open"

    const actionsHtml = actions
      .map(
        (action) =>
          `<button class="btn ${action.class || "btn-primary"}" onclick="${action.onclick}">${action.text}</button>`,
      )
      .join("")

    modal.innerHTML = `
            <div class="modal-box">
                <h3 class="font-bold text-lg">${title}</h3>
                <div class="py-4">${content}</div>
                <div class="modal-action">
                    ${actionsHtml}
                    <button class="btn" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        `

    document.body.appendChild(modal)
    return modal
  }

  // Format currency
  formatCurrency(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  // Validate form
  validateForm(formElement) {
    const inputs = formElement.querySelectorAll("input[required], select[required], textarea[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("input-error")
        isValid = false
      } else {
        input.classList.remove("input-error")
      }
    })

    return isValid
  }

  // Debounce function
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}

// Global UI manager instance
const uiManager = new UIManager()

// Global utility functions
function showToast(message, type = "info", duration = 3000) {
  uiManager.showToast(message, type, duration)
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  uiManager.updateCartBadge(totalItems)
}

function showLoading(elementId, text = "Loading...") {
  uiManager.showLoading(elementId, text)
}

function hideLoading(elementId) {
  uiManager.hideLoading(elementId)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .animate-slideOut {
        animation: slideOut 0.3s ease-in forwards;
    }
    
    .input-error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 1px #ef4444 !important;
    }
`
document.head.appendChild(style)

// Export UI manager for global use
window.uiManager = uiManager
