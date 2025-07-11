document.addEventListener("DOMContentLoaded", () => {
  window.updateCartCount()
  loadProductDetails()
  initializeQuantityControls()
})

function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search)
  const productDetails = document.getElementById("product-details")

  const product = {
    id: urlParams.get("id"),
    title: urlParams.get("title"),
    price: urlParams.get("price"),
    image: urlParams.get("image"),
    description: urlParams.get("description"),
  }

  if (product.id && product.title && product.price && product.image) {
    displayProductDetails(product)
    productDetails.classList.remove("hidden")
    productDetails.classList.add("animate-fade-in-up")
  } else {
    window.location.href = "index.html"
  }
}

function displayProductDetails(product) {
  document.getElementById("product-image").src = product.image
  document.getElementById("product-image").alt = product.title
  document.getElementById("product-title").textContent = product.title
  document.getElementById("product-price").textContent = `$${product.price}`
  document.getElementById("product-description").textContent = product.description

  document.title = `${product.title} - ShopHub`

  const addToCartBtn = document.getElementById("add-to-cart-btn")
  addToCartBtn.onclick = () => addToCartFromDetails(product)
}

function initializeQuantityControls() {
  const quantityInput = document.getElementById("quantity")

  quantityInput.addEventListener("change", function () {
    if (this.value < 1) {
      this.value = 1
    }
  })
}

function increaseQuantity() {
  const quantityInput = document.getElementById("quantity")
  quantityInput.value = Number.parseInt(quantityInput.value) + 1
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("quantity")
  const currentValue = Number.parseInt(quantityInput.value)
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1
  }
}

function addToCartFromDetails(product) {
  const quantity = Number.parseInt(document.getElementById("quantity").value)
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number.parseFloat(product.price),
      image: product.image,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.updateCartCount()

  showToast(`${quantity} item(s) added to cart!`, "success")

  const addToCartBtn = document.getElementById("add-to-cart-btn")
  addToCartBtn.classList.add("animate-pulse-gentle")
  setTimeout(() => {
    addToCartBtn.classList.remove("animate-pulse-gentle")
  }, 600)
}

function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `alert alert-${type} fixed top-4 right-4 z-50 w-auto max-w-sm animate-slide-in`
  toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${message}</span>
    `

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 3000)
}
