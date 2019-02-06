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
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem, Form } from "native-base";
import LIST_CABALLOS from './queries/listCaballos'
import ListCaballos from './ListCaballos'


export default class SearchHorse extends React.Component {

  state = {
    numero: '',
    nombre: '',
    criadero: '',
    listCaballos: [],
  }

  /*item clicked*/
  _onPressCaballo = (client, item) => {
    console.log("on press caballo")
    /*updates the cache with the new current horse*/
    updateCacheCurrentHorse(client, item)
    /*reset query state*/
    this.setState({ query: '' })
    /*Navigate to Genealogía
    https://reactnavigation.org/docs/en/tab-based-navigation.html#jumping-between-tabs
    */
    this.props.navigation.navigate('Genealogía')
  }

  _onChangeNumero = (val) => {
    this.setState({ numero: val })
  }
  _onChangeNombre = (val) => {
    this.setState({ nombre: val })
  }
  _onChangeCriadero = (val) => {
    this.setState({ criadero: val })
  }

  //no se esta usando
  _onPressButton = (listCaballos) => {
    console.log(listCaballos)

    const numero = this.state.numero
    const nombre = this.state.nombre
    const criadero = this.state.criadero

    console.log("numero: ", numero)
    console.log("nombre: ", nombre)
    console.log("criadero: ", criadero)



    const query = this.state.query
    const activeQuery = this.state.activeQuery
    const action = "returnWithoutPreviousResult"
    /*if the user pressed the button with emnpty query*/
    if(query == '') {
      //do nothing
      return
    }
    /*if the user pressed the button with the same query twice*/
    if(query == activeQuery ) {
      return
    }

    //this.props.onSearch(query, action)

    /*set the active query for a future comparison*/
    this.setState({ activeQuery: query })
  }


  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'blue'}}/>
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            {this.state.listCaballos.length == 0 &&
            <Title>Buscar Caballo</Title>
            }
            {this.state.listCaballos.length != 0 &&
            <Title>Resultado</Title>
            }
          </Body>
          <Right />
        </Header>

        <Content>
          {this.state.listCaballos.length == 0 &&
            <View>
              <Form style={{ marginTop: 40 }}>
                <Item>
                  <Input placeholder="Número..." onChangeText={(val) => this._onChangeNumero(val)}/>
                </Item>
                <Item>
                  <Input placeholder="Nombre..." onChangeText={(val) => this._onChangeNombre(val)}/>
                </Item>
                <Item last>
                  <Input placeholder="Criadero..." onChangeText={(val) => this._onChangeCriadero(val)}/>
                </Item>
                <ApolloConsumer>
                {client => (
                  <Button style={{ marginTop: 10, width: 200, alignSelf: 'center' }} primary onPress={
                    async () => {
                      const { data } = await client.query({
                        query: LIST_CABALLOS,
                        variables: { genNumero: this.state.numero, gen_nombre: this.state.nombre, nombre_criadero: this.state.criadero }
                      });
                      this.setState({
                        listCaballos: data.listCaballos,
                        showForm: false
                      })
                    }
                  }>
                    <Text style={{ marginLeft: 50, alignSelf: 'center' }}>Buscar</Text>
                  </Button>
                )}
                </ApolloConsumer>

              </Form>
            </View>
          }

          {this.state.listCaballos.length != 0  &&
          /* - The ListCaballos child component is also a function so it can be
          called like one (passing the propper props)...and is much faster
          - Instead of this:
          <ListCaballos list={listCaballos} onPressCaballo={this._onPressCaballo}/>
          https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f */
          ListCaballos({ list: this.state.listCaballos, onPressCaballo: this._onPressCaballo })
          }
        </Content>
      </Container>
    )
  }
}



//const Search = compose(
//  GraphQL.operations.SearchHorse
//)(SearchHorse);

//export default Search

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
