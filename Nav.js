import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Amplify, { Auth } from 'aws-amplify'



import TabsAuth from './TabsAuth'
import TabsMain from './TabsMain'
import Router from './Router'



export default class Nav extends React.Component {

  state = {
    isAuthenticated: false
  }

  // function that sets state isAuthenticated (true or false)
  authenticate(isAuthenticated) {
    this.setState({ isAuthenticated })
  }

  render() {
    //if user is authenticated, return that view
    if(this.state.isAuthenticated) {
      return (
        <View style={styles.container}>
          <Router/>
        </View>
      )
    }

    /*if it's not authenticated*/
    return (
      <View style={styles.container}>
        <TabsAuth
          //props passed to all screens defined in TabsAuth.js
          screenProps={{
            authenticate: this.authenticate.bind(this)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
