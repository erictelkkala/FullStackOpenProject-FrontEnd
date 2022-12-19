import { Container, Stack } from '@mui/material'
import { useCart } from '../redux/hooks'
import CartItem from './CartItem'

function Cart() {
  const { cart } = useCart()

  return (
    <Container>
      <Stack direction="column" justifyContent="center" spacing={2}>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </Stack>
    </Container>
  )
}

export default Cart
