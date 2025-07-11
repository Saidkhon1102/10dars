document.addEventListener("DOMContentLoaded", () => {
  console.log("ShopHub E-commerce App Initialized")
  updateCartCount()
  loadProducts()
  document.documentElement.style.scrollBehavior = "smooth"
})

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0)
  }
}

const sampleProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://futuretechnologies.co.ke/wp-content/uploads/2024/07/Havit-H628BT-Wireless-b1a.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    image: "https://istarmax.com/wp-content/uploads/2022/01/s5-black-1024x1024.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 3,
    title: "Portable Power Bank",
    price: 29.99,
    image: "https://iniushop.com/cdn/shop/files/B5_c14ee22a-a4bc-4da7-9249-380c0bfcac4b.png?v=1747879946",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 4,
    title: "Wireless Charging Pad",
    price: 39.99,
    image: "https://cdn.shopify.com/s/files/1/0493/9834/9974/products/A2503016-Anker_313_Wireless_Charger_Pad.png?v=1672495119",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 59.99,
    image: "https://i5.walmartimages.com/seo/JBL-Charge-4-Portable-Bluetooth-Speaker-Blue_4e4b6806-dd04-4278-82df-4e726facc3ea_1.8fdfbef9493e8f727490f51f43ceeb07.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 6,
    title: "USB-C Hub",
    price: 49.99,
    image: "https://media.startech.com/cms/products/gallery_large/5g2a2cpdb-usb-c-hub._main.jpg",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card slots. Expand your laptop's connectivity.",
  },
  {
    id: 7,
    title: "Wireless Mouse",
    price: 24.99,
    image: "https://i5.walmartimages.com/seo/Logitech-Silent-Wireless-Mouse-2-4-GHz-with-USB-Receiver-Ambidextrous-Lavender_5e726c0f-1cd9-49eb-80f5-bed9e7f7947e.2c99856c258a71b62e4be82e15b44bc9.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
  {
    id: 8,
    title: "Phone Stand",
    price: 14.99,
    image: "https://www.progressivedesk.com/cdn/shop/products/DA-19_1.jpg?v=1670970917&width=1946",
    description: ".Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt",
  },
]

function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  const loading = document.getElementById("loading") 

  if (loading) {
    loading.style.display = "none"
  }

  sampleProducts.forEach((product, index) => {
    const productCard = createProductCard(product)
    productCard.style.animationDelay = `${index * 0.1}s`
    productCard.classList.add("animate-fade-in-up")
    productsGrid.appendChild(productCard)
  })
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "card bg-base-100 shadow-xl product-card cursor-pointer"
  card.onclick = () => redirectToProductDetails(product)

  card.innerHTML = `
        <figure class="image-container">
            <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-lg">${product.title}</h2>
            <p class="text-base-content/70 text-sm line-clamp-2">${product.description}</p>
            <div class="card-actions justify-between items-center mt-4">
                <span class="text-2xl font-bold text-primary">$${product.price}</span>
                <button class="btn btn-primary btn-sm btn-custom" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Buy Now
                </button>
            </div>
        </div>
    `

  return card
}

function redirectToProductDetails(product) {
  const params = new URLSearchParams({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    description: product.description,
  })

  window.location.href = `about.html?${params.toString()}`
}

function addToCart(productId) {
  const product = sampleProducts.find((p) => p.id === productId)
  if (product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    showToast("Product added to cart!", "success")
  }
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
