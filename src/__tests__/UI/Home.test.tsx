import { screen } from '@testing-library/react'

import Home from '../../Home.js'
import { render } from '../../utils/test-utils.js'

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
    expect(screen.getByText('This item is very much an item')).toBeInTheDocument()
    expect(screen.getByText('100 €')).toBeInTheDocument()
  })
  it('should render a message if there are no items', () => {
    const mockItems = undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Home mockItems={mockItems} />)
    expect(screen.getByText('No items to display')).toBeInTheDocument()
  })
})