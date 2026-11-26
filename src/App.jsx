import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ProductList from './pages/product/ProductList'
import CartList from './pages/cart/CartList'
import Navbar from './components/Navbar'
import { addToCart, getCart, updateCartItem } from './utils/api'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const itemCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0)

  useEffect(() => {
    getCart(setCartItems)
  }, [])

  async function handleAddToCart(product, size) {
    const existingItem = cartItems.find(
      (item) => item.productId === product.id && item.size === size,
    )
    let savedItem

    if (existingItem) {
      savedItem = await updateCartItem(existingItem.id, {
        quantity: Number(existingItem.quantity) + 1,
      })
      if (savedItem) {
        setCartItems((items) => items.map((item) => item.id === savedItem.id ? savedItem : item))
      }
    } else {
      const discount = product.discountPercentage
      savedItem = await addToCart({
        productId: product.id,
        title: product.title,
        heroImage: product.heroImage,
        originalPrice: product.originalPrice,
        price: product.originalPrice * (1 - discount / 100),
        discountPercentage: discount,
        size,
        color: product.color,
        quantity: 1,
      })
      if (savedItem) setCartItems((items) => [...items, savedItem])
    }

    return savedItem
  }

  return (
    <>
      <Navbar
        onSearch={setSearchTerm}
        itemCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <Box component="main" sx={{ pt: '64px' }}>
        <ProductList onAddToCart={handleAddToCart} searchTerm={searchTerm} />
      </Box>
      <CartList
        cartItems={cartItems}
        itemCount={itemCount}
        setCartItems={setCartItems}
        open={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
      />
    </>
  )
}

export default App
