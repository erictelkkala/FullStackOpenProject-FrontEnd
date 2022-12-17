import { useParams } from 'react-router-dom'

function ListingDetails() {
  const { id } = useParams()
  return (
    <div>
      <h1>Listing Details</h1>
      <p>Listing ID: {id}</p>
    </div>
  )
}

export default ListingDetails
