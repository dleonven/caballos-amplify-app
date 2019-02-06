import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { SearchBar, ListView } from 'react-native-elements'
import { Container, Header, Footer, Content, Accordion, Text, List, ListItem, Left, Icon, Body, Title, Right, Button } from 'native-base'
import LASD from './queries/listColleraSerie'
import LIST_EXPOSICIONES from './queries/listExposiciones'
import GET_CURRENT_HORSE from './queries/currentHorse'
import BasicHorseData from './BasicHorseData'


const Exposiciones = (props) => (
  <Query query={GET_CURRENT_HORSE}>
    {({ data: {currentHorse: { id } }}) => (
      <Query query={LIST_EXPOSICIONES} variables={{genNumero: id}}>
      {({ loading, error, data }) => {
        if(loading) return <Text style={styles.loading}>Loading...</Text>
        if (error) {
          console.log("error1: ", error)
          return <Text style={styles.error}>Error...</Text>
        }

        console.log(data.listExposiciones)
        let anho
        let mes
        let dia

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
                <Title>Exposiciones</Title>
              </Body>
              <Right />
            </Header>
            <BasicHorseData/>
            <List dataArray={data.listExposiciones}
            renderRow={(item) => (
              <ListItem>
              {dia = item.exp_fecha.substring(8,10)}
              {mes = item.exp_fecha.substring(5,7)}
              {anho = item.exp_fecha.substring(0,4)}
                <Text>
                  {item.exp_temporada}
                  <Text style={styles.description}>
                    {"\n"}{dia}-{mes}-{anho} {item.exp_exposicion}
                    {"\n"}{item.exp_lugar}º Categoría {item.exp_categoria}
                  </Text>
                </Text>
              </ListItem>
            )}>
            </List>

          </Container>
        )
      }}
      </Query>
    )}
  </Query>
)

export default Exposiciones

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
