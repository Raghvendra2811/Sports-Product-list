import { useRef, useState } from 'react'
import {
  Box,
  Divider,
  IconButton,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import Button from '../../components/Button'
import { removeFromCart, updateCartItem } from '../../utils/api'
import { formatPrice } from '../../utils'
import CartItemCard from './CartItemCard'
import OrderConfirmation from '../order/OrderConfirmation'

function CartList({ cartItems, itemCount, setCartItems, open, onOpen, onClose }) {
  const [busyItems, setBusyItems] = useState([])
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderedItems, setOrderedItems] = useState([])
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const confirmationPending = useRef(false)
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
    setBusyItems((ids) => [...ids, item.id])
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
    setBusyItems((ids) => ids.filter((id) => id !== item.id))
  }

  function handleRemove(item) {
    handleQuantityChange(item, -Number(item.quantity))
  }

  async function handlePlaceOrder() {
    setPlacingOrder(true)
    const items = [...cartItems]
    const results = await Promise.all(items.map((item) => removeFromCart(item.id)))
    const remainingItems = items.filter((_, index) => !results[index])
    setCartItems(remainingItems)
    if (remainingItems.length === 0) {
      setOrderedItems(items)
      confirmationPending.current = true
      onClose()
    }
    setPlacingOrder(false)
  }

  return (
    <>
      <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      slotProps={{
        transition: {
          onExited: () => {
            if (confirmationPending.current) {
              confirmationPending.current = false
              setOrderConfirmed(true)
            }
          },
        },
      }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100vw', sm: 480 }, maxWidth: '100vw' } }}
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
              onClick={onClose}
              sx={{ mt: 2, px: 4, py: 1.25 }}
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
                  disabled={busyItems.includes(item.id) || placingOrder}
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
              <Button
                fullWidth
                disabled={placingOrder || busyItems.length > 0}
                onClick={handlePlaceOrder}
                sx={{ mt: 1.5, py: 1.25 }}
              >
                {placingOrder ? 'Placing Order…' : 'Place Order'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      </SwipeableDrawer>
      <OrderConfirmation
        open={orderConfirmed}
        items={orderedItems}
        onContinue={() => {
          setOrderConfirmed(false)
          onClose()
        }}
      />
    </>
  )
}

export default CartList
