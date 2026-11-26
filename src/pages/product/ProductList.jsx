import { useEffect, useState } from 'react'
import { Box, Button, Card, Divider, MenuItem, Select, Skeleton, Typography } from '@mui/material'
import { getProducts } from '../../utils/api'
import ProductCard from './ProductCard'

const categories = [
  ['all', 'All Categories'],
  ['track-pants', 'Track Pants'],
  ['t-shirts', 'T-Shirts'],
  ['shorts', 'Shorts'],
  ['jackets', 'Jackets'],
  ['shoes', 'Shoes'],
  ['polo-t-shirts', 'Polo T-Shirts'],
]

function ProductList({ onAddToCart, searchTerm }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [gender, setGender] = useState('all')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      await getProducts(setProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase()
    const result = products.filter((product) =>
      (gender === 'all' || product.gender === gender) &&
      (category === 'all' || product.category === category) &&
      product.title.toLowerCase().includes(query),
    )

    if (sort !== 'featured') {
      result.sort((a, b) => {
        const aPrice = a.originalPrice * (1 - a.discountPercentage / 100)
        const bPrice = b.originalPrice * (1 - b.discountPercentage / 100)
        return sort === 'price-asc' ? aPrice - bPrice : bPrice - aPrice
      })
    }

    // filteredProducts is kept as state so the API response remains unchanged.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(result)
  }, [products, gender, category, sort, searchTerm])

  function resetFilters() {
    setGender('all')
    setCategory('all')
    setSort('featured')
  }

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #e5e5e5', bgcolor: 'background.paper' }}>
        <Box sx={{ width: 'min(100% - 32px, 1280px)', mx: 'auto', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: { xs: 'stretch', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ display: 'flex', width: 'fit-content', p: 0.5, bgcolor: '#f1f1f3' }}>
              {['all', 'men', 'women'].map((value) => (
                <Button
                  key={value}
                  onClick={() => setGender(value)}
                  sx={{ minWidth: 76, borderRadius: 0, bgcolor: gender === value ? '#1a1c1d' : 'transparent', color: gender === value ? '#fff' : '#5f5e5e', '&:hover': { bgcolor: gender === value ? '#1a1c1d' : '#e5e5e5' } }}
                >
                  {value}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', flex: 1, minWidth: 0, gap: 1, overflowX: 'auto', pb: 0.5 }}>
              {categories.map(([value, label]) => (
                <Button
                  key={value}
                  onClick={() => setCategory(value)}
                  sx={{ flexShrink: 0, border: '1px solid #e0e0e0', borderRadius: 0, bgcolor: category === value ? '#1a1c1d' : '#f7f7f8', color: category === value ? '#fff' : '#1a1c1d', '&:hover': { bgcolor: category === value ? '#1a1c1d' : '#ececee' } }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Button onClick={resetFilters} sx={{ color: 'text.secondary' }}>↻ Reset</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap', color: 'text.secondary', textTransform: 'uppercase' }}>
                Sort by:
              </Typography>
              <Select value={sort} onChange={(event) => setSort(event.target.value)} size="small" aria-label="Sort products" sx={{ minWidth: { xs: 160, sm: 210 }, borderRadius: 0, bgcolor: '#f7f7f8' }}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
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
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        {!loading && filteredProducts.length === 0 && (
          <Typography sx={{ gridColumn: '1 / -1', py: 4, textAlign: 'center' }}>
            No products found.
          </Typography>
        )}
      </Box>
    </>
  )
}

export default ProductList
