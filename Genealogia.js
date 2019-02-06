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
import GenBox from './GenBox'
//Genealogia component
/*https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b*/
const Genealogia = (props) =>
  /*Query component that recieves the query for the current horse in cache*/
  <Query query={GET_CURRENT_HORSE}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) {
        console.log(error)
        return <Text>Error...</Text>
      }

      /*extract the data..this data is the one obtained from the query GET_CURRENT_HORSE,
      that gets data from cache*/
      const {
        id,
        name,
        color,
        birth_date,
        nombre_criadero,

        g_1_nombree,
        g_2_nombree,
        g_1_1_nombree,
        g_1_2_nombree,
        g_2_1_nombree,
        g_2_2_nombree,
        g_1_1_1_nombree,
        g_1_1_2_nombree,
        g_1_2_1_nombree,
        g_1_2_2_nombree,
        g_2_1_1_nombree,
        g_2_1_2_nombree,
        g_2_2_1_nombree,
        g_2_2_2_nombree,

        g_1_numeroo,
        g_2_numeroo,
        g_1_1_numeroo,
        g_1_2_numeroo,
        g_2_1_numeroo,
        g_2_2_numeroo,
        g_1_1_1_numeroo,
        g_1_1_2_numeroo,
        g_1_2_1_numeroo,
        g_1_2_2_numeroo,
        g_2_1_1_numeroo,
        g_2_1_2_numeroo,
        g_2_2_1_numeroo,
        g_2_2_2_numeroo,

        g_1_fecha_nacimiento,
        g_2_fecha_nacimiento,
        g_1_1_fecha_nacimiento,
        g_1_2_fecha_nacimiento,
        g_2_1_fecha_nacimiento,
        g_2_2_fecha_nacimiento

      } = data.currentHorse

      const dia = birth_date.substring(8,10)
      const mes = birth_date.substring(5,7)
      const anho = birth_date.substring(0,4)



      return (
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => props.navigation.openDrawer()}>
                <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'blue'}}/>
              </Button>
            </Left>
            <Body style={{flex: 3}}>
              <Title>Genealogía</Title>
            </Body>
            <Right />
          </Header>

          <Card style={{ alignItems: 'center' }}>
            <Text style={styles.title}>{nombre_criadero} - {name}</Text>
            <Text style={styles.description}>Nº: {id} - Nac: {dia}/{mes}/{anho} - Color: {color}</Text>
          </Card>

            <ApolloConsumer>
              {client => (
              <Grid>
                <Col>
                  /*padre*/
                  { GenBox({ genNumero: g_1_numeroo, nombre: g_1_nombree, fecha_nacimiento: g_1_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                  /*madre*/
                  { GenBox({ genNumero: g_2_numeroo, nombre: g_2_nombree, fecha_nacimiento: g_2_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                </Col>
                <Col>
                  { GenBox({ genNumero: g_1_1_numeroo, nombre: g_1_1_nombree, fecha_nacimiento: g_1_1_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                  { GenBox({ genNumero: g_1_2_numeroo, nombre: g_1_2_nombree, fecha_nacimiento: g_1_2_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                  { GenBox({ genNumero: g_2_1_numeroo, nombre: g_2_1_nombree, fecha_nacimiento: g_2_1_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                  { GenBox({ genNumero: g_2_2_numeroo, nombre: g_2_2_nombree, fecha_nacimiento: g_2_2_fecha_nacimiento, onPressCaballo: this._onPressCaballo, client: client, showAnho: true }) }
                </Col>
                <Col>
                  { GenBox({ genNumero: g_1_1_1_numeroo, nombre: g_1_1_1_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_1_1_2_numeroo, nombre: g_1_1_2_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_1_2_1_numeroo, nombre: g_1_2_1_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_1_2_2_numeroo, nombre: g_1_2_2_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_2_1_1_numeroo, nombre: g_2_1_1_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_2_1_2_numeroo, nombre: g_2_1_2_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_2_2_1_numeroo, nombre: g_2_2_1_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                  { GenBox({ genNumero: g_2_2_2_numeroo, nombre: g_2_2_2_nombree, onPressCaballo: this._onPressCaballo, client: client, showAnho: false }) }
                </Col>
              </Grid>
              )}
            </ApolloConsumer>

        </Container>
      )
    }
  }
  </Query>

const getAnho = (fecha_nacimiento) => (
  fecha_nacimiento.substring(0, 4)
)

const getColor = (color) => {
  if(color == 'B') {
    return 'Blanco'
  }
  else if(color == 'N') {
    return 'Negro'
  }
  else if(color == 'C') {
    return 'Café'
  }
  else if(color == 'SC') {
    return 'Sin color'
  }
}

/*https://www.apollographql.com/docs/react/essentials/queries.html#manual-query*/
_onPressCaballo = async (client, id) => {
  const { data } = await client.query({
     query: LIST_CABALLOS,
   variables: { genNumero: id, gen_nombre: '', nombre_criadero: '' }
  });

  /*the query returns a list (in this case with just one horse), so we have to
  extract the first and only item of it*/
  const item = data.listCaballos[0]
  updateCacheCurrentHorse(client, item)
}

//the way to export stateless components
//export default Genealogia
export default Genealogia;


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
    textAlign: 'center'
  }
});
