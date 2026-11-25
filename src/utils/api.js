const BASE_URL = 'https://6b06f7a757fa1297bb568079.mockapi.io'

const PRODUCT_URL = `${BASE_URL}/Products`
const CART_URL = `${BASE_URL}/Cart`

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getProducts(setProducts) {
  try {
    const response = await fetch(PRODUCT_URL)
    const products = await readResponse(response)
    setProducts(products)
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

export async function getCart(setCartItems) {
  try {
    const response = await fetch(CART_URL)
    const cartItems = await readResponse(response)
    setCartItems(cartItems)
  } catch (error) {
    console.error('Failed to load cart:', error)
  }
}

export async function addToCart(item) {
  try {
    const response = await fetch(CART_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })

    return await readResponse(response)
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  }
}

export async function updateCartItem(itemId, updates) {
  try {
    const response = await fetch(`${CART_URL}/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    return await readResponse(response)
  } catch (error) {
    console.error('Failed to update cart item:', error)
  }
}

export async function removeFromCart(itemId) {
  try {
    const response = await fetch(`${CART_URL}/${itemId}`, { method: 'DELETE' })

    return await readResponse(response)
  } catch (error) {
    console.error('Failed to remove cart item:', error)
  }
}

