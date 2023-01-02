import { useParams } from 'react-router-dom'

import { useAppSelector } from './redux/hooks'

function ItemDetails() {
  const { id } = useParams()

  // TODO: Make it fetch the data from the database
  const item = useAppSelector((state) =>
    state.shoppingCart.items.find((item) => item.id === id)
  ) || {
    id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: ''
  }

  return (
    <div>
      <h1>Item Details</h1>
      <p>Item ID: {item.id}</p>
    </div>
  )
}

export default ItemDetails
