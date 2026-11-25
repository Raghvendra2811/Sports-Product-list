import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { getProducts } from '../../utils/api'
import ProductCard from './ProductCard'

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts(setProducts).catch((error) => {
      console.error('Failed to load products:', error)
    })
  }, [])

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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  )
}

export default ProductList
