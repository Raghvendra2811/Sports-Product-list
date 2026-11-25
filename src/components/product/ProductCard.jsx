import { Box, Button, Card, Chip, Typography } from '@mui/material'

const condensedFont = '"Roboto Condensed", "Arial Narrow", Arial, sans-serif'

function ProductCard({ product }) {
  const title = product.title ?? product.name ?? 'Untitled product'
  const description = product.description ?? ''
  const image = product.image ?? product.imageUrl ?? product.thumbnail
  const tags = Array.isArray(product.tags) ? product.tags : []
  const discount = Number(product.discountPercentage ?? product.discount ?? 0)
  const originalPrice = Number(product.originalPrice ?? product.price ?? 0)
  const discountedPrice = originalPrice * (1 - discount / 100)
  const formatPrice = (price) =>
    `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 0 }}>
      <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: '#eee' }}>
        {image && (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            size="small"
            sx={{
              position: 'absolute',
              top: 1.5,
              left: 1.5,
              borderRadius: 0,
              bgcolor: '#a5e82c',
              fontFamily: condensedFont,
              fontWeight: 800,
            }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 0.75, p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, overflow: 'hidden' }}>
          {tags.slice(0, 2).map((tag) => (
            <Typography key={tag} variant="caption" noWrap sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>
              {tag}
            </Typography>
          ))}
          {tags.length > 2 && (
            <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
              +{tags.length - 2}
            </Typography>
          )}
        </Box>

        <Typography
          title={title}
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: condensedFont, fontSize: '1.2rem', fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography
          title={description}
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'text.secondary', fontFamily: condensedFont }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1, my: 1 }}>
          <Typography sx={{ fontFamily: condensedFont, fontSize: '1.2rem', fontWeight: 800 }}>
            {formatPrice(discountedPrice)}
          </Typography>
          {discount > 0 && (
            <>
              <Typography sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                {formatPrice(originalPrice)}
              </Typography>
              <Typography sx={{ color: '#4c6900', fontWeight: 800 }}>{discount}% OFF</Typography>
            </>
          )}
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 'auto', borderRadius: 0, bgcolor: '#a5e82c', color: '#172000', fontFamily: condensedFont, fontWeight: 800, '&:hover': { bgcolor: '#96d321' } }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  )
}

export default ProductCard
