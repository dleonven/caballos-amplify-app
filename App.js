import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);
import { withAuthenticator } from 'aws-amplify-react-native';
import { Rehydrated } from 'aws-appsync-react'
import PhotoGrid from 'react-native-image-grid'

import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
//import Nav from './Nav'
import Router from './Router'

import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

class App extends React.Component {

  state = { urlItems: [] }

  componentDidMount() {
    const that = this
    let urlItems = []
    let counter = 0
    Storage.list('')
      .then(keyItems => {
        /*for each photo key in the folder..*/
        keyItems.forEach(function(keyItem) {
          console.log("keyItem key: ", keyItem.key)
          if(keyItem.key != '') {
            /*get the URL*/
            Storage.get(keyItem.key)
              .then(urlItem => {
                /*add URL item to state*/

                urlItems.push({ key: counter, source: urlItem })
                counter++

                if(counter == keyItems.length-1) {
                  that.setState({ urlItems: urlItems })
                }
              })
              .catch(err => {
                console.log("error fetching photo URL", err)
              })
          }
        })
      })
      .catch(err => {
        console.log("error fetching photos keys", err)
      })

  }

  render() {

    if(this.state.urlItems.length > 0) {
      console.log("asd: ", this.state.urlItems[0].source)
    }

    return (
      <PhotoGrid
          data = { this.state.urlItems }
          itemsPerRow = { 3 }
          itemMargin = { 1 }
          itemPaddingHorizontal={1}
          renderHeader = { renderHeader }
          renderItem = { renderItem }
        />
    )
  }
}

const renderHeader = () => {
    return(
      <Text>I'm on top!</Text>
    )
  }

const renderItem = (item, itemSize, itemPaddingHorizontal) => {
  console.log("item source: ", item.source)
  return(
    <TouchableOpacity
      key = { item.key }
      style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
      onPress = { () => {
        // Do Something
      }}>
      <Image
        resizeMode = "cover"
        style = {{ flex: 1 }}
        source = {{ uri: item.source }}
      />
    </TouchableOpacity>
  )
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
