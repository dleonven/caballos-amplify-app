import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { SearchBar, ListView } from 'react-native-elements'
import { Container, Header, Footer, Content, Accordion, Text, List, ListItem, Left, Icon, Body, Title, Right, Button } from 'native-base'
import LASD from './queries/listColleraSerie'
import LIST_HIJOS from './queries/listHijos'
import LIST_HIJOS_BY_RANGE from './queries/listHijosByRange'

import GET_CURRENT_HORSE from './queries/currentHorse'
import BasicHorseData from './BasicHorseData'

const _onPressCaballo = (client, item) => {
  console.log("pressed")
}

const Hijos = (props) => (
  <Query query={GET_CURRENT_HORSE}>
    {({ data: {currentHorse: { id } }}) => (
      <Query query={LIST_HIJOS_BY_RANGE} variables={{genNumero: id}}>
      {({ loading, error, data }) => {
        if(loading) return <Text style={styles.loading}>Loading...</Text>
        if (error) {
          console.log("error1: ", error)
          return <Text style={styles.error}>Error...</Text>
        }
        let dataArray = new Array()
        let title_acordeon

        for (var i=0; i<data.listHijosByRange.length; i++) {
          let hijos = []
          const { key_range, itemsHijos } = data.listHijosByRange[i]
          //console.log(itemsHijos)

          for (var j=0; j<itemsHijos.length; j++) {
            const { genNumero, gen_nombre, nombre_criadero, fecha_nacimiento, g_1_nombre } = itemsHijos[j]

            hijos.push(
              <List key={genNumero}>
                <ListItem>
                  <Text>
                    {nombre_criadero} - {gen_nombre}
                    <Text style={styles.description}>
                      {"\n"}Nº: {genNumero} - A: {fecha_nacimiento.substring(0,4)} - P: {g_1_nombre}
                    </Text>
                  </Text>
                </ListItem>
              </List>
            )

            if(j == itemsHijos.length-1) {
              /*set the title of the acordeon*/
              title_acordeon = <Text>{key_range.substring(0,4)} - {parseInt(key_range.substring(11,15))-1} ({itemsHijos.length})</Text>
            }
          }
          /*
          - push the range element to the array
          - make the container height fit the content (list of caballos) height
          https://stackoverflow.com/questions/52130674/react-native-have-view-height-set-by-content
          */
          dataArray.push({title: title_acordeon, content: <Container style={{ height: 'auto', flex: 0 }}>{hijos}</Container> })
        }



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
                <Title>Hijos</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <BasicHorseData/>
              <Accordion
                dataArray={dataArray}
                headerStyle={{ backgroundColor: "#D6CECD" }}
                /*make the container height fit the content (list of caballos) height
                https://stackoverflow.com/questions/52130674/react-native-have-view-height-set-by-content*/
                contentStyle={{ height: 'auto', flex: 0 }}
              />
            </Content>
          </Container>
        )
      }}
      </Query>
    )}
  </Query>
)

export default Hijos;

const styles = StyleSheet.create({
  container: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "white",

    paddingLeft: 10,
    paddingTop: 30,
    marginTop: 0,
  },
  basicHorseData: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "white"
  },
  accordion: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "white",

    marginTop: -415,

  },
  SubAccordionRodeoContent: {
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "red",

    marginTop: 30,
    marginBottom: 10,
  },
  listItem: {
    //border
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "red",

    height: 15,
    marginTop: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  },
  loading: {
    textAlign: 'center',
    paddingTop: 50
  },
  error: {
    textAlign: 'center',
    paddingTop: 50
  },
});
