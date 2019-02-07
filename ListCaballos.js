import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Query } from "react-apollo";
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { SearchBar, ListView, Rating } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import debounce from 'lodash/debounce'
import gql from 'graphql-tag'
import {updateCacheCurrentHorse} from './updateCacheCurrentHorse'
import * as GraphQL from './graphql'
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem } from "native-base";
import GET_HORSE_BY_ID from './queries/getHorseById'


const ListCaballos = (props) =>
  <View>
    <ApolloConsumer>
    {
      client => (
        <List dataArray={props.list}
        renderRow={(item) =>
          <ListItem>
            <TouchableHighlight onPress={() => props.onPressCaballo(client, item)}>
              <Text>
                {item.nombre_criadero} - {item.gen_nombre}
                <Text style={styles.description}>
                  {"\n"}Nº: {item.genNumero} - A: {item.fecha_nacimiento.substring(0,4)} - P: {item.g_1_nombre}
                </Text>
              </Text>
            </TouchableHighlight>
          </ListItem>
        }>
        </List>
      )
    }
    </ApolloConsumer>
  </View>


export default ListCaballos

const styles = StyleSheet.create({
  container: {
    //border:
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',

    //responsive height
    height: hp('88%'),

    marginTop: 33,


    //borderBottom: '1px solid #ddd'
  },
  loading: {
    textAlign: 'center',
    paddingTop: 50
  },
  body: {
    //border:
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',

    marginTop: 10,
    marginBottom: 77,

    marginLeft: 20
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    //border:
    //borderBottomRadius: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  }
});
