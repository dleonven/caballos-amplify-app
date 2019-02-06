import gql from 'graphql-tag'

export default gql`
query {
  currentHorse @client {
    id
    name
    nombre_criadero
    birth_date
    g_1_nombree
  }
}
`
