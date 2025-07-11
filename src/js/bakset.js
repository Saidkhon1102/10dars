class ShoppingCart {
  constructor() {
    this.items = this.loadCart()
  }

 
  loadCart() {
    try {
      const cartData = localStorage.getItem("cart")
      return cartData ? JSON.parse(cartData) : []
    } catch (error) {
      console.error("Error loading cart:", error)
      return []
    }
  }


  saveCart() {
    try {
      localStorage.setItem("cart", JSON.stringify(this.items))
    } catch (error) {
      console.error("Error saving cart:", error)
    }
  }

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

  
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.saveCart()
  }

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


  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }


  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  clearCart() {
    this.items = []
    this.saveCart()
  }
 
  getItems() {
    return this.items
  }
}


const cart = new ShoppingCart()


function updateCartCount() {
  const cartCountElements = document.querySelectorAll("#cart-count")
  const totalItems = cart.getTotalItems()

  cartCountElements.forEach((element) => {
    element.textContent = totalItems

  
    if (totalItems > 0) {
      element.classList.add("cart-badge-animate")
      setTimeout(() => {
        element.classList.remove("cart-badge-animate")
      }, 300)
    }
  })
}


function addToCart(productId) {

  console.log(`Adding product ${productId} to cart`)
}


function getCartSummary() {
  return {
    items: cart.getItems(),
    totalItems: cart.getTotalItems(),
    totalPrice: cart.getTotalPrice(),
  }
}

function initializeCart() {
  updateCartCount()
  console.log("Cart initialized with", cart.getTotalItems(), "items")
}


window.cartFunctions = {
  addItem: (product, quantity) => cart.addItem(product, quantity),
  removeItem: (productId) => cart.removeItem(productId),
  updateQuantity: (productId, quantity) => cart.updateQuantity(productId, quantity),
  getTotalItems: () => cart.getTotalItems(),
  getTotalPrice: () => cart.getTotalPrice(),
  getItems: () => cart.getItems(),
  clearCart: () => cart.clearCart(),
}
