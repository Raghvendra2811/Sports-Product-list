import { useState } from 'react'
import { Box, Button as MuiButton, Chip, Dialog, IconButton, Typography } from '@mui/material'
import Button from '../../components/Button'
import { formatPrice } from '../../utils'

function ProductDetail({ product, open, onClose, onAddToCart }) {
  const { title, description, heroImage, tags, sizes, gender, category, color, originalPrice, discountPercentage } = product
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? '')
  const [adding, setAdding] = useState(false)
  const discountedPrice = originalPrice * (1 - discountPercentage / 100)

  async function handleAddToCart() {
    setAdding(true)
    const addedItem = await onAddToCart(product, selectedSize)
    setAdding(false)
    if (addedItem) onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      aria-labelledby="product-details-title"
      PaperProps={{ sx: { borderRadius: 0, overflow: 'hidden' } }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          maxHeight: { xs: '90vh', md: 'min(760px, 90vh)' },
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            minHeight: { xs: 260, sm: 360, md: 560 },
            p: { xs: 2, md: 5 },
            bgcolor: '#f1f1f3',
          }}
        >
          <Box
            component="img"
            src={heroImage}
            alt={title}
            sx={{ width: '100%', height: '100%', maxHeight: 480, objectFit: 'contain' }}
          />
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', p: { xs: 3, sm: 5, md: 7 } }}>
          <IconButton
            aria-label="Close product details"
            onClick={onClose}
            sx={{ position: 'absolute', top: 12, right: 12 }}
          >
            <Typography component="span" sx={{ fontSize: 30, lineHeight: 1 }}>
              ×
            </Typography>
          </IconButton>

          <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', pr: 5 }}>
            {[gender, category].filter(Boolean).join(' • ')}
          </Typography>
          <Typography id="product-details-title" variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>
            {description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            <Typography sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 800 }}>
              {formatPrice(discountedPrice)}
            </Typography>
            {discountPercentage > 0 && (
              <>
                <Typography sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                  {formatPrice(originalPrice)}
                </Typography>
                <Chip label={`${discountPercentage}% OFF`} sx={{ borderRadius: 0, bgcolor: '#a5e82c', fontWeight: 800 }} />
              </>
            )}
          </Box>

          {color && (
            <Typography sx={{ mt: 3, fontWeight: 600 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1, textTransform: 'uppercase' }}>Colour:</Box>
              {color}
            </Typography>
          )}

          {tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {tags.map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 1, color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>
              Select size
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {sizes.map((size) => (
                <MuiButton
                  key={size}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  sx={{
                    minWidth: { xs: 48, sm: 64 },
                    borderRadius: 0,
                    borderColor: '#d8d8d8',
                    color: selectedSize === size ? '#a5e82c' : 'text.primary',
                    bgcolor: selectedSize === size ? '#191c1d' : 'transparent',
                    '&:hover': { bgcolor: selectedSize === size ? '#191c1d' : '#f5f5f5' },
                  }}
                >
                  {size}
                </MuiButton>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 'auto', pt: 4 }}>
            <Button
              fullWidth
              disabled={adding || (sizes.length > 0 && !selectedSize)}
              onClick={handleAddToCart}
              sx={{ pt: 1.5, pb: 1.5, fontSize: '1rem' }}
            >
              {adding ? 'Adding…' : 'Add to Cart'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ProductDetail
