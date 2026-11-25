import { useEffect, useState } from 'react'
import { Box, Card, Skeleton, Typography } from '@mui/material'
import { getProducts } from '../../utils/api'
import ProductCard from './ProductCard'

function ProductList({ onAddToCart, searchTerm }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      await getProducts(setProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const visibleProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <Box
      component="section"
      aria-label="Products"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          sm: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
        alignItems: 'stretch',
        gap: { xs: 1.5, sm: 2.5 },
        width: 'min(100% - 32px, 1280px)',
        mx: 'auto',
        py: { xs: 2, sm: 3 },
      }}
    >
      {loading
        ? Array.from({ length: 8 }, (_, index) => (
            <Card key={index} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
              <Skeleton variant="rectangular" sx={{ width: '100%', height: 'auto', aspectRatio: '1' }} />
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 0.75, p: { xs: 1.5, sm: 2 } }}>
                <Skeleton width="55%" />
                <Skeleton height={28} />
                <Skeleton width="80%" />
                <Skeleton width="65%" height={32} sx={{ my: 1 }} />
                <Skeleton variant="rectangular" height={36} sx={{ mt: 'auto' }} />
              </Box>
            </Card>
          ))
        : visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
      {!loading && visibleProducts.length === 0 && searchTerm && (
        <Typography sx={{ gridColumn: '1 / -1', py: 4, textAlign: 'center' }}>
          No products found.
        </Typography>
      )}
    </Box>
  )
}

export default ProductList
