import { getCookie } from 'typescript-cookie'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Get the token from the cookie and set the authorization header
const authLink = setContext((_, { headers }) => {
  const token = getCookie('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

let url: string
switch (process.env.NODE_ENV) {
  case 'development':
    url = 'http://localhost:3001/api/items'
    break
  case 'production':
    url = 'https://withered-dawn-3663.fly.dev/api/items'
    break
  default:
    url = ''
}

const httpLink = new HttpLink({ uri: url })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

export default client
