import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose } from 'react-apollo';
import { SearchBar, ListItem, ListView } from 'react-native-elements'
import GET_CURRENT_HORSE_BASIC_DATA from './queries/currentHorseBasicData'
import { Constants, Svg } from 'expo'
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, Card } from "native-base";
import { withNavigation } from 'react-navigation';

const BasicHorseData = (props) =>
  <Query query={GET_CURRENT_HORSE_BASIC_DATA}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) {
        console.log(error)
        return <Text>Error...</Text>
      }

      /*extract the data..this data is the one obtained from the query GET_CURRENT_HORSE_BASIC_DATA,
      that gets data from cache*/
      const {
        id,
        name,
        nombre_criadero,
        birth_date,
        g_1_nombree,
      } = data.currentHorse

      const birth_year = birth_date.substring(0,4)

      return (
        <Card style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{nombre_criadero} - {name}</Text>
          <Text style={styles.description}>Nº: {id} - A: {birth_year} - P: {g_1_nombree}</Text>
        </Card>
      )
    }
  }
  </Query>

  /*the way to export stateless components
  https://reactnavigation.org/docs/en/connecting-navigation-prop.html*/
  export default withNavigation(BasicHorseData)

  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
    },
    description: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, .5)',
    }
  });
