import { useMemo, useState } from 'react'
import { Badge, Box, IconButton, SvgIcon, TextField, Typography } from '@mui/material'
import { debounce } from '../utils'

function Navbar({ onSearch, itemCount, onOpenCart }) {
  const [query, setQuery] = useState('')
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch])

  return (
    <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'appBar', bgcolor: 'background.paper', borderBottom: '1px solid #e5e5e5' }}>
      <Box sx={{ display: 'flex', height: 64, alignItems: 'center', gap: { xs: 1, sm: 2 }, width: 'min(100% - 32px, 1280px)', mx: 'auto' }}>
        <Typography variant="h6" sx={{ flexShrink: 0, fontSize: { xs: '0.9rem', sm: '1.25rem' }, fontWeight: 700 }}>
          Techno Sport
        </Typography>
        <TextField
          type="search"
          size="small"
          placeholder="Search products"
          value={query}
          onChange={(event) => {
            const value = event.target.value
            setQuery(value)
            debouncedSearch(value)
          }}
          slotProps={{ htmlInput: { 'aria-label': 'Search products' } }}
          sx={{ width: { xs: '100%', sm: 320 }, minWidth: 0, ml: 'auto' }}
        />
        <IconButton aria-label={`Open cart, ${itemCount} items`} onClick={onOpenCart}>
          <Badge badgeContent={itemCount} color="primary">
            <SvgIcon>
              <path d="M7 7V6a5 5 0 0 1 10 0v1h3v14H4V7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Zm-3 2v10h12V9H6Z" />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Navbar
