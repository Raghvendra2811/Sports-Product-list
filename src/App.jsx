import { useEffect, useState } from 'react'
import { Badge, Box, IconButton, SvgIcon, TextField, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ProductList from './components/product/ProductList'
import CartList from './components/cart/CartList'
import { addToCart, getCart, updateCartItem } from './utils/api'

const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 500,
    },
    body2: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 400,
    },
  },
})

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
      <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'appBar', bgcolor: 'background.paper', borderBottom: '1px solid #e5e5e5' }}>
        <Box sx={{ display: 'flex', height: 64, alignItems: 'center', gap: { xs: 1, sm: 2 }, width: 'min(100% - 32px, 1280px)', mx: 'auto' }}>
          <Typography variant="h6" sx={{ flexShrink: 0, fontSize: { xs: '0.9rem', sm: '1.25rem' }, fontWeight: 700 }}>
            Techno Sport
          </Typography>
          <TextField
            type="search"
            size="small"
            placeholder="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            slotProps={{ htmlInput: { 'aria-label': 'Search products' } }}
            sx={{ width: { xs: '100%', sm: 320 }, minWidth: 0, ml: 'auto' }}
          />
          <IconButton aria-label={`Open cart, ${itemCount} items`} onClick={() => setCartOpen(true)}>
            <Badge badgeContent={itemCount} color="primary">
              <SvgIcon>
                <path d="M7 7V6a5 5 0 0 1 10 0v1h3v14H4V7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Zm-3 2v10h12V9H6Z" />
              </SvgIcon>
            </Badge>
          </IconButton>
        </Box>
      </Box>
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

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
