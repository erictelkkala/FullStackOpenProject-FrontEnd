import { screen } from '@testing-library/react'

import Home from '../Home'
import { render } from '../utils/test-utils'

describe('Home', () => {
  it('renders the home page', () => {
    const mockItems = [
      {
        id: '1',
        name: 'The react Logo',
        description: 'This item is very much an item',
        price: 100,
        quantity: 0,
        image: 'src\\assets\\react.svg'
      }
    ]
    render(<Home mockItems={mockItems} />)
    expect(screen.getByText('The react Logo')).toBeInTheDocument()
  })
})
