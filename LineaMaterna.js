import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { SearchBar, ListView } from 'react-native-elements'
import { Container, Header, Footer, Content, Accordion, Text, List, ListItem, Left, Icon, Body, Title, Right, Button } from 'native-base'
import LIST_HIJOS from './queries/listHijos'
import GET_CURRENT_HORSE from './queries/currentHorse'
import BasicHorseData from './BasicHorseData'

/*https://www.apollographql.com/docs/react/react-apollo-migration.html#compose-to-render-composition*/
const LineaMaterna = (props) => (
  <Query query={GET_CURRENT_HORSE}>
  {({ data: {currentHorse: { g_2_numeroo, g_2_nombree, g_2_nombre_criadero, g_2_fecha_nacimiento,
    g_2_2_numeroo, g_2_2_nombree, g_2_2_nombre_criadero, g_2_2_fecha_nacimiento,
    g_2_2_2_numeroo, g_2_2_2_nombree } }}) => (
    <Query query={LIST_HIJOS} variables={{genNumero: g_2_numeroo}}>
    {({ loading: loading, error, data }) => {
      if(loading) return <Text style={styles.loading}>Loading...</Text>

      const title_primera_madre = <Text style={styles.title}>1ª Madre ({data.listHijos.length} hijos){'\n'}
                                    {g_2_nombre_criadero} - {g_2_nombree}{'\n'}
                                    <Text style={styles.description}>Nº: {g_2_numeroo} - A: {g_2_fecha_nacimiento.substring(0,4)} - P: {g_2_2_nombree}</Text>
                                  </Text>

      let hijosPrimeraMadre = []

      for (var i=0; i<data.listHijos.length; i++) {
        const hijo = data.listHijos[i]
        hijosPrimeraMadre.push(
          <List key={i}>
            <ListItem>
              <Text style={styles.title}>{hijo.nombre_criadero} - {hijo.gen_nombre}{'\n'}
                <Text style={styles.description}>Nº: {hijo.genNumero} - A: {hijo.fecha_nacimiento.substring(0,4)} - P: {hijo.g_1_nombre}</Text>
              </Text>
            </ListItem>
         </List>
        )
      }

      return (
        <Query query={LIST_HIJOS} variables={{genNumero: g_2_2_numeroo}}>
        {({ loading: loading, error, data }) => {
          if(loading) return <Text style={styles.loading}>Loading...</Text>

          const title_segunda_madre = <Text style={styles.title}>2ª Madre ({data.listHijos.length} hijos){'\n'}
                                        {g_2_2_nombre_criadero} - {g_2_2_nombree}{'\n'}
                                        <Text style={styles.description}>Nº: {g_2_2_numeroo} - A: {g_2_2_fecha_nacimiento.substring(0,4)} - P: {g_2_2_nombree}</Text>
                                      </Text>

          let hijosSegundaMadre = []
          for (var i=0; i<data.listHijos.length; i++) {
            const hijo = data.listHijos[i]
            hijosSegundaMadre.push(
              <List key={i}>
                <ListItem>
                  <Text style={styles.title}>{hijo.nombre_criadero} - {hijo.gen_nombre}{'\n'}
                    <Text style={styles.description}>Nº: {hijo.genNumero} - A: {hijo.fecha_nacimiento.substring(0,4)} - P: {hijo.g_1_nombre}</Text>
                  </Text>
                </ListItem>
             </List>
            )
          }

          return (
            <Query query={LIST_HIJOS} variables={{genNumero: g_2_2_2_numeroo}}>
            {({ loading: loading, error, data }) => {
              if(loading) return <Text style={styles.loading}>Loading...</Text>

              /*we get nombre_criadero and fecha_nacimiento from the hijo*/
              const title_tercera_madre = <Text style={styles.title}>3ª Madre ({data.listHijos.length} hijos){'\n'}
                                            {data.listHijos[0].g_2_nombre_criadero} - {g_2_2_2_nombree}{'\n'}
                                            <Text style={styles.description}>Nº: {g_2_2_2_numeroo} - A: {data.listHijos[0].g_2_fecha_nacimiento.substring(0,4)} - P: {g_2_2_nombree}</Text>
                                          </Text>

              let dataArray = new Array()

              let hijosTerceraMadre = []

              for (var i=0; i<data.listHijos.length; i++) {
                const hijo = data.listHijos[i]
                hijosTerceraMadre.push(
                  <List key={i}>
                    <ListItem>
                      <Text style={styles.title}>{hijo.nombre_criadero} - {hijo.gen_nombre}{'\n'}
                        <Text style={styles.description}>Nº: {hijo.genNumero} - A: {hijo.fecha_nacimiento.substring(0,4)} - P: {hijo.g_1_nombre}</Text>
                      </Text>
                    </ListItem>
                 </List>
                )
              }
              dataArray.push(
                { title: title_primera_madre, content: hijosPrimeraMadre },
                { title: title_segunda_madre, content: hijosSegundaMadre },
                { title: title_tercera_madre, content: hijosTerceraMadre }
              )

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
                      <Title>Línea Materna</Title>
                    </Body>
                    <Right />
                  </Header>
                  <Content>
                    <BasicHorseData/>
                    <Accordion
                      dataArray={dataArray}
                      headerStyle={{ backgroundColor: "#D6CECD" }}
                    />
                  </Content>
                </Container>
              )
            }}
            </Query>

          )
        }}
        </Query>
      )
    }}
    </Query>
    )}
  </Query>
)

export default LineaMaterna;

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
