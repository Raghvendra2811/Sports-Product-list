import { useEffect, useState } from 'react'
import { getCart } from '../../utils/api'

function CartList() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    getCart(setCartItems).catch((error) => {
      console.error('Failed to load cart:', error)
    })
  }, [])

  return (
    <section aria-label="Cart">
      {cartItems.map((item) => (
        <article key={item.id}>{item.name ?? item.title}</article>
      ))}
    </section>
  )
}

export default CartList
