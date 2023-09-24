import { gql } from '@apollo/client'

export const GET_USER = gql`
  query findUserById($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($name: String!, $password: String!) {
    addUser(name: $name, password: $password) {
      id
      name
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`

export const ME = gql`
  query me {
    me {
      id
      name
    }
  }
`
