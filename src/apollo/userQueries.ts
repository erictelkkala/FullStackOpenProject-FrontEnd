export const GET_USER = `#graphql
    query findUserById($id: ID!) {
        user(id: $id) {
            _id
            name
        }
    }
`

export const ADD_USER = `#graphql
    mutation addUser($name: String!, $password: String!) {
        addUser(name: $name, password: $password) {
            _id
            name
        }
    }
`

export const LOGIN_USER = `#graphql
    mutation login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            _id
            name
        }
    }
`
