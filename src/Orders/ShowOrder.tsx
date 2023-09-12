import { useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import { GET_ORDER_BY_ID } from '../graphql/orderQueries'

function ShowOrder() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <h1>Order</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default ShowOrder
