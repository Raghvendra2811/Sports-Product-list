import { useState } from 'react'
import { Box, Button, Card, Chip, Typography } from '@mui/material'
import ProductDetail from './ProductDetail'
import { formatPrice } from '../../utils'

function ProductCard({ product, onAddToCart }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { title, description, heroImage, tags, originalPrice, discountPercentage } = product
  const discountedPrice = originalPrice * (1 - discountPercentage / 100)
  const openDialog = () => setDialogOpen(true)

  return (
    <>
      <Card
        component="article"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={openDialog}
        onKeyDown={(event) => {
          if (event.target === event.currentTarget && ['Enter', ' '].includes(event.key)) {
            event.preventDefault()
            openDialog()
          }
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: 0,
          cursor: 'pointer',
          '&:focus-visible': { outline: '2px solid #446900', outlineOffset: 2 },
        }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: '#eee' }}>
          <Box
            component="img"
            src={heroImage}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {discountPercentage > 0 && (
            <Chip
              label={`${discountPercentage}% OFF`}
              size="small"
              sx={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                borderRadius: 0,
                bgcolor: '#a5e82c',
                fontWeight: 800,
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: 0.75,
            p: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              overflow: 'hidden',
            }}
          >
            {tags.slice(0, 2).map((tag) => (
              <Typography
                key={tag}
                variant="caption"
                noWrap
                sx={{
                  color: 'text.secondary',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </Typography>
            ))}
            {tags.length > 2 && (
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', flexShrink: 0 }}
              >
                +{tags.length - 2}
              </Typography>
            )}
          </Box>

          <Typography
            variant="h6"
            title={title}
            noWrap
            sx={{ textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            title={description}
            noWrap
            sx={{ color: 'text.secondary' }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 1,
              my: 1,
            }}
          >
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {formatPrice(discountedPrice)}
            </Typography>
            {discountPercentage > 0 && (
              <>
                <Typography
                  sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                >
                  {formatPrice(originalPrice)}
                </Typography>
                <Typography sx={{ color: '#4c6900', fontWeight: 800 }}>
                  {discountPercentage}% OFF
                </Typography>
              </>
            )}
          </Box>

          <Button
            variant="contained"
            sx={{
              mt: 'auto',
              borderRadius: 0,
              bgcolor: '#a5e82c',
              color: '#172000',
              fontWeight: 800,
              '&:hover': { bgcolor: '#96d321' },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
      <ProductDetail
        product={product}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  )
}

export default ProductCard
