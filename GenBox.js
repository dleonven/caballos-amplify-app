import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { SearchBar, ListItem, ListView, Rating } from 'react-native-elements'
import GET_CURRENT_HORSE from './queries/currentHorse'
import LIST_CABALLOS from './queries/listCaballos'
import { Constants, Svg } from 'expo';
import BasicHorseData from './BasicHorseData'
import * as GraphQL from './graphql'
import {updateCacheCurrentHorse} from './updateCacheCurrentHorse'
import { Container, Body, Content, Header, Footer, Left, Right, Icon, Title, Input, Item, Label, Button, Text, Card } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

const GenBox = (props) =>
  <Row style={{ borderRadius: 2, borderWidth: 0.2, borderColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableHighlight onPress={() => props.onPressCaballo(props.client, props.genNumero)}>
      <Text>{props.nombre}{'\n'}
        {props.showAnho==true &&
          <Text style={styles.description}>A: {props.fecha_nacimiento.substring(0,4)}</Text>
        }
      </Text>
    </TouchableHighlight>
  </Row>
export default GenBox

const styles = StyleSheet.create({
  container: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",

    paddingLeft: 10,
    paddingTop: 30,
    marginTop: 0,

  },
  basicHorseData: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "blue"
  },
  responsiveBox: {
    width: wp('85%'),
    height: hp('85%'),
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "white"
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  }
});
