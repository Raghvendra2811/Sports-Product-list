import { Box, Dialog, SvgIcon, Typography } from '@mui/material'
import Button from '../../components/Button'
import { formatPrice } from '../../utils'

function OrderConfirmation({ open, items, onContinue }) {
  const itemCount = items.reduce((count, item) => count + Number(item.quantity), 0)
  const total = items.reduce((amount, item) => amount + item.price * item.quantity, 0)

  return (
    <Dialog open={open} onClose={onContinue} fullWidth maxWidth="md">
      <Box sx={{ p: { xs: 2.5, sm: 5 }, textAlign: 'center' }}>
        <Box sx={{ display: 'grid', placeItems: 'center', width: 88, height: 88, mx: 'auto', borderRadius: '50%', bgcolor: '#a5e82c' }}>
          <SvgIcon sx={{ fontSize: 48 }}>
            <path d="m9 16.2-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5L9 16.2Z" />
          </SvgIcon>
        </Box>
        <Typography sx={{ mt: 2.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Dispatch Initialized
        </Typography>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
          Order Confirmed!
        </Typography>
        <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>
          Thank you for shopping with Techno Sport. Your order has been placed.
        </Typography>

        <Box sx={{ mt: 4, p: { xs: 2, sm: 3 }, bgcolor: '#f1f1f3', textAlign: 'left' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Order Summary</Typography>
            <Typography sx={{ fontWeight: 700 }}>{itemCount} Items</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: '#fff' }}>
                <Box component="img" src={item.heroImage} alt={item.title} sx={{ width: 64, height: 72, objectFit: 'cover' }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700 }} noWrap title={item.title}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Size {item.size} · Qty {item.quantity}{item.color ? ` · ${item.color}` : ''}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2, p: 2, bgcolor: '#fff' }}>
            <Typography sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Final Paid Amount</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatPrice(total)}</Typography>
          </Box>
        </Box>

        <Button
          onClick={onContinue}
          sx={{ mt: 4, px: 5, py: 1.25, bgcolor: '#2f3132', color: '#fff', '&:hover': { bgcolor: '#1a1c1d' } }}
        >
          Continue Shopping →
        </Button>
      </Box>
    </Dialog>
  )
}

export default OrderConfirmation
