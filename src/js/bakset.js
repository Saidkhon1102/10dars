// Shopping cart functionality
class ShoppingCart {
  constructor() {
    this.items = this.loadCart()
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const cartData = localStorage.getItem("cart")
      return cartData ? JSON.parse(cartData) : []
    } catch (error) {
      console.error("Error loading cart:", error)
      return []
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem("cart", JSON.stringify(this.items))
    } catch (error) {
      console.error("Error saving cart:", error)
    }
  }

  // Add item to cart
  addItem(product, quantity = 1) {
    const existingItem = this.items.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    }

    this.saveCart()
    return true
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.saveCart()
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveCart()
      }
    }
  }

  // Get total items count
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  // Get total price
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Clear cart
  clearCart() {
    this.items = []
    this.saveCart()
  }

  // Get all items
  getItems() {
    return this.items
  }
}

// Global cart instance
const cart = new ShoppingCart()

// Update cart count in navbar
function updateCartCount() {
  const cartCountElements = document.querySelectorAll("#cart-count")
  const totalItems = cart.getTotalItems()

  cartCountElements.forEach((element) => {
    element.textContent = totalItems

    // Add animation when count changes
    if (totalItems > 0) {
      element.classList.add("cart-badge-animate")
      setTimeout(() => {
        element.classList.remove("cart-badge-animate")
      }, 300)
    }
  })
}

// Add item to cart (global function)
function addToCart(productId) {
  // This function is called from the main app
  // The actual implementation is in app.js
  console.log(`Adding product ${productId} to cart`)
}

// Get cart summary for display
function getCartSummary() {
  return {
    items: cart.getItems(),
    totalItems: cart.getTotalItems(),
    totalPrice: cart.getTotalPrice(),
  }
}

// Initialize cart functionality
function initializeCart() {
  updateCartCount()
  console.log("Cart initialized with", cart.getTotalItems(), "items")
}

// Export cart functions for use in other modules
window.cartFunctions = {
  addItem: (product, quantity) => cart.addItem(product, quantity),
  removeItem: (productId) => cart.removeItem(productId),
  updateQuantity: (productId, quantity) => cart.updateQuantity(productId, quantity),
  getTotalItems: () => cart.getTotalItems(),
  getTotalPrice: () => cart.getTotalPrice(),
  getItems: () => cart.getItems(),
  clearCart: () => cart.clearCart(),
}
