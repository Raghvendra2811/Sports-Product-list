import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  IconButton,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import { removeFromCart, updateCartItem } from '../../utils/api'
import { formatPrice } from '../../utils'
import CartItemCard from './CartItemCard'

function CartList({ cartItems, itemCount, setCartItems, open, onOpen, onClose }) {
  const [updating, setUpdating] = useState(false)
  const originalSubtotal = cartItems.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0,
  )
  const payableTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const discountTotal = originalSubtotal - payableTotal

  async function handleQuantityChange(item, change) {
    setUpdating(true)
    const quantity = Number(item.quantity) + change
    if (quantity < 1) {
      const removedItem = await removeFromCart(item.id)
      if (removedItem) setCartItems((items) => items.filter((entry) => entry.id !== item.id))
    } else {
      const updatedItem = await updateCartItem(item.id, { quantity })
      if (updatedItem) {
        setCartItems((items) => items.map((entry) => entry.id === item.id ? updatedItem : entry))
      }
    }
    setUpdating(false)
  }

  async function handleRemove(item) {
    setUpdating(true)
    const removedItem = await removeFromCart(item.id)
    if (removedItem) setCartItems((items) => items.filter((entry) => entry.id !== item.id))
    setUpdating(false)
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 480 }, maxWidth: '100vw' } }}
    >
      <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', bgcolor: '#f7f7f8', p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Your Cart{cartItems.length > 0 && ` (${itemCount})`}
          </Typography>
          <IconButton aria-label="Close cart" onClick={onClose}>
            ×
          </IconButton>
        </Box>
        <Divider />

        {cartItems.length === 0 ? (
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'grid', placeItems: 'center', width: 96, height: 96, bgcolor: '#eeeef0' }}>
              <SvgIcon sx={{ fontSize: 40 }}>
                <path d="M7 7V6a5 5 0 0 1 10 0v1h3v14H4V7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Zm-3 2v10h12V9H6Z" />
              </SvgIcon>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Your cart is empty</Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                Looks like you haven&apos;t added any sportswear gear yet.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ mt: 2, px: 4, py: 1.25, borderRadius: 0, bgcolor: '#a5e82c', color: '#172000', fontWeight: 800, '&:hover': { bgcolor: '#96d321' } }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', py: 1.5 }}>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  disabled={updating}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </Box>

            <Box sx={{ p: 1.5, bgcolor: '#fff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2">Total Items</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{itemCount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2">Original Subtotal</Typography>
                <Typography variant="body2">{formatPrice(originalSubtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2">Total Discount Savings</Typography>
                <Typography variant="body2" sx={{ color: '#4c6900', fontWeight: 700 }}>
                  −{formatPrice(discountTotal)}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                <Typography sx={{ fontWeight: 700 }}>Final Payable Amount</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 800 }}>{formatPrice(payableTotal)}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </SwipeableDrawer>
  )
}

export default CartList
