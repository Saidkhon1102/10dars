class ApiService {
  constructor() {
    this.baseUrl = ""
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  async request(url, options = {}) {
    try {
      const config = {
        headers: { ...this.defaultHeaders, ...options.headers },
        ...options,
      }

      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Request failed:", error)
      throw error
    }
  }

  async get(url, headers = {}) {
    return this.request(url, {
      method: "GET",
      headers,
    })
  }

  async post(url, data, headers = {}) {
    return this.request(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
  }

  async put(url, data, headers = {}) {
    return this.request(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })
  }

  async delete(url, headers = {}) {
    return this.request(url, {
      method: "DELETE",
      headers,
    })
  }
}

class ProductService extends ApiService {
  constructor() {
    super()
    this.productsEndpoint = "/api/products"
  }

  async getAllProducts() {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getSampleProducts())
        }, 500)
      })
    } catch (error) {
      console.error("Error fetching products:", error)
      return this.getSampleProducts()
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getAllProducts()
      return products.find((product) => product.id === Number.parseInt(id))
    } catch (error) {
      console.error("Error fetching product:", error)
      return null
    }
  }

  async searchProducts(query) {
    try {
      const products = await this.getAllProducts()
      return products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    } catch (error) {
      console.error("Error searching products:", error)
      return []
    }
  }

  getSampleProducts() {
    return [
      {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        category: "Electronics",
        rating: 4.5,
        inStock: true,
      },
      {
        id: 2,
        title: "Smart Fitness Watch",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Advanced fitness tracking with heart rate monitor, GPS, and waterproof design. Track your health and stay connected.",
        category: "Wearables",
        rating: 4.3,
        inStock: true,
      },
      {
        id: 3,
        title: "Portable Power Bank",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "High-capacity 20000mAh power bank with fast charging technology. Keep your devices powered on the go.",
        category: "Accessories",
        rating: 4.7,
        inStock: true,
      },
      {
        id: 4,
        title: "Wireless Charging Pad",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Sleek wireless charging pad compatible with all Qi-enabled devices. Fast and efficient charging solution.",
        category: "Accessories",
        rating: 4.2,
        inStock: true,
      },
      {
        id: 5,
        title: "Bluetooth Speaker",
        price: 59.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Portable Bluetooth speaker with 360-degree sound and waterproof design. Perfect for outdoor adventures.",
        category: "Audio",
        rating: 4.6,
        inStock: true,
      },
      {
        id: 6,
        title: "USB-C Hub",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card slots. Expand your laptop's connectivity.",
        category: "Accessories",
        rating: 4.4,
        inStock: true,
      },
      {
        id: 7,
        title: "Wireless Mouse",
        price: 24.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for extended use.",
        category: "Accessories",
        rating: 4.1,
        inStock: true,
      },
      {
        id: 8,
        title: "Phone Stand",
        price: 14.99,
        image: "/placeholder.svg?height=300&width=300",
        description:
          "Adjustable phone stand for desk use. Perfect for video calls, watching videos, and hands-free use.",
        category: "Accessories",
        rating: 4.0,
        inStock: true,
      },
    ]
  }
}

class OrderService extends ApiService {
  constructor() {
    super()
    this.ordersEndpoint = "/api/orders"
  }

  async createOrder(orderData) {
    try {
      console.log("Creating order:", orderData)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            status: "confirmed",
            ...orderData,
          })
        }, 1000)
      })
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  }

  async getOrderById(orderId) {
    try {
      console.log("Fetching order:", orderId)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: orderId,
            status: "processing",
            items: [],
            total: 0,
          })
        }, 500)
      })
    } catch (error) {
      console.error("Error fetching order:", error)
      throw error
    }
  }
}

const productService = new ProductService()
const orderService = new OrderService()

const DataUtils = {
  formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  },

  formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

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
  },
}

window.services = {
  product: productService,
  order: orderService,
  utils: DataUtils,
}
