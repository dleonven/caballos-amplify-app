import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import LIST_CABALLOS from './queries/listCaballos'
import GET_HORSE_BY_ID from './queries/getHorseById'


const fetchMoreHorses = (props, searchQuery, action) => {
  return props.data.fetchMore({
    query: LIST_CABALLOS,
    variables: {
      searchQuery
    },
    /* In the updateQuery function, we update the cache with the new
    results from our search query, triggering a re-render of our component
    & showing them to the user */
    updateQuery: (previousResult, { fetchMoreResult }) => {

      let items
      items = [...previousResult.listCaballos, ...fetchMoreResult.listCaballos]

      if(action == "returnWithoutPreviousResult") {
        items = [...fetchMoreResult.listCaballos]
      }
      else if(action == "returnWithPreviousResult") {
        items = [...previousResult.listCaballos, ...fetchMoreResult.listCaballos]
      }

      return {
        listCaballos: items
      }
    }
  })
}

const searchById = (props, genNumero) => {
  console.log(props)
  return props.data.fetchMore({
    query: LIST_CABALLOS,
    variables: {
      genNumero
    },
    /* In the updateQuery function, we update the cache with the new
    results from our search query, triggering a re-render of our component
    & showing them to the user */
    updateQuery: (previousResult, { fetchMoreResult }) => {

      let items
      items = [...previousResult.listCaballos, ...fetchMoreResult.listCaballos]

      if(action == "returnWithoutPreviousResult") {
        items = [...fetchMoreResult.listCaballos]
      }
      else if(action == "returnWithPreviousResult") {
        items = [...previousResult.listCaballos, ...fetchMoreResult.listCaballos]
      }

      return {
        listCaballos: items
      }
    }
  })
}


//React Component level operations
export const operations = {
  SearchHorse: graphql(LIST_CABALLOS, {
    options: data => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      onSearch: (searchQuery, action) => {
        fetchMoreHorses(props, searchQuery, action)
      },
      onSearchById: (numero) => {
        console.log("im here")
        searchById(props, numero)
      },
      data: props.data
    })
  })
}
