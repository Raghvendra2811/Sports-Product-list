import { Box, IconButton, SvgIcon, Typography } from '@mui/material'
import { formatPrice } from '../../utils'

function CartItemCard({ item, disabled, onQuantityChange, onRemove }) {
  return (
    <Box
      component="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: '76px minmax(0, 1fr) auto',
        gap: 1.5,
        p: 1.5,
        mb: 1,
        bgcolor: '#fff',
      }}
    >
      <Box
        component="img"
        src={item.heroImage}
        alt={item.title}
        sx={{ width: 76, height: 96, objectFit: 'cover', bgcolor: '#eee' }}
      />
      <Box sx={{ display: 'flex', minWidth: 0, flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" noWrap title={item.title}>
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Size: {item.size}{item.color ? ` · ${item.color}` : ''}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: 'fit-content', alignItems: 'center', bgcolor: '#f1f1f3' }}>
          <IconButton aria-label={`Decrease ${item.title} quantity`} disabled={disabled} size="small" onClick={() => onQuantityChange(item, -1)}>
            −
          </IconButton>
          <Typography sx={{ minWidth: 28, textAlign: 'center' }}>{item.quantity}</Typography>
          <IconButton aria-label={`Increase ${item.title} quantity`} disabled={disabled} size="small" onClick={() => onQuantityChange(item, 1)}>
            +
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <IconButton aria-label={`Remove ${item.title} from cart`} disabled={disabled} size="small" onClick={() => onRemove(item)}>
          <SvgIcon fontSize="small">
            <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1ZM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6Z" />
          </SvgIcon>
        </IconButton>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</Typography>
          {item.discountPercentage > 0 && (
            <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
              {formatPrice(item.originalPrice * item.quantity)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default CartItemCard
