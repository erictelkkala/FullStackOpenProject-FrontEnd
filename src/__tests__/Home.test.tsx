import { screen } from '@testing-library/react'
import { render } from '../utils/test-utils'

import Home from '../Home'

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
