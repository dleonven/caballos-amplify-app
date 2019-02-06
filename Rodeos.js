import React from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo'
import { graphql, compose, ApolloConsumer } from 'react-apollo';
import { SearchBar, ListView } from 'react-native-elements'
import { Container, Header, Footer, Content, Accordion, Text, List, ListItem, Left, Icon, Body, Title, Right, Button } from 'native-base'
import LASD from './queries/listColleraSerie'
import LIST_COLLERA_SERIE from './queries/listColleraSerieByTemporada'
import GET_CURRENT_HORSE from './queries/currentHorse'
import BasicHorseData from './BasicHorseData'


const Rodeo = (props) => (
  <Query query={GET_CURRENT_HORSE}>
    {({ data: {currentHorse: { id } }}) => (
      <Query query={LIST_COLLERA_SERIE} variables={{genNumero: id}}>
      {({ loading, error, data }) => {
        if(loading) return <Text style={styles.loading}>Loading...</Text>
        if (error) {
          console.log("error1: ", error)
          return <Text style={styles.error}>Error...</Text>
        }

        let dataArray = new Array()
        let fecha_titulo_acordeonRodeo
        let glosa_tipo_rodeo_titulo_acordeonRodeo
        let glosa_club_titulo_acordeon
        let glosa_asociacion_titulo_acordeon
        let jinete1_glosa_

        /*iterate through list of temporadas*/
        for (var i=0; i<data.listBucketsByTemporada.length; i++) {
          const { key_temporada, itemsRodeo } = data.listBucketsByTemporada[i]

          let title_acordeonTemporada = key_temporada + " ("+itemsRodeo.length+")"

          let subAccordionDataArray = new Array()
          /*iterate through list of rodeos*/
          for (var j=0; j<itemsRodeo.length; j++) {
            let series = []
            let anho
            let mes
            let dia
            let jinete1_glosa_final
            let jinete2_glosa_final

            const { key_codigo_rodeo, itemsColleraSerie } = itemsRodeo[j]

            /*iterate through list of collera serie*/
            for (var k=0; k<itemsColleraSerie.length; k++) {
              const { fecha_inicio, glosa_tipo_rodeo, glosa_club, glosa_asociacion, id, glosa_serie, lugar,
                puntaje_total, ultimo_animal, jinete1_glosa, caballo1_nombre,
                jinete2_glosa, caballo2_nombre, codigo_serie } = itemsColleraSerie[k]

              /*colleras series are ordered by fecha_inicio, so the first one is
              the date of the start of the rodeo, so we need to get the first one*/
              if(k==0){

                anho = fecha_inicio.substring(0,4)
                mes = fecha_inicio.substring(5,7)
                dia = fecha_inicio.substring(8,10)

                fecha_titulo_acordeonRodeo = dia + "-" + mes + "-" + anho
                glosa_tipo_rodeo_titulo_acordeonRodeo = glosa_tipo_rodeo.substring(0,19) + "."
                glosa_club_titulo_acordeon = glosa_club
                glosa_asociacion_titulo_acordeon = glosa_asociacion
              }

              if(jinete1_glosa === "") {
                jinete1_glosa_final = "NN"
              }
              else { jinete1_glosa_final = jinete1_glosa }

              if(jinete2_glosa === "") {
                jinete2_glosa_final = "NN"
              }
              else { jinete2_glosa_final = jinete2_glosa }

              series.push(
                <List key={k}>
                {/** the collera is generally the same for each rodeo, so push it only once on the first iteration **/}
                {k==0 &&
                <ListItem>
                  <Text style={styles.description}>{caballo1_nombre} / {caballo2_nombre} / {jinete1_glosa_final} / {jinete2_glosa_final}</Text>
                </ListItem>}
                 <ListItem key={codigo_serie}>
                   <Text>{glosa_serie}   {lugar}º   {puntaje_total} pts</Text>
                 </ListItem>
               </List>
              )

              /*push the rodeo element on the last iteration of collera series*/
              if(k==itemsColleraSerie.length-1) {
                /*set the title of the acordeonRodeo*/
                const title_acordeonRodeo = <Text>{fecha_titulo_acordeonRodeo} {glosa_tipo_rodeo_titulo_acordeonRodeo}{"\n"}<Text style={styles.description}>Club {glosa_club_titulo_acordeon} - Asoc. {glosa_asociacion_titulo_acordeon}</Text></Text>
                /*push the rodeo element to the array*/
                subAccordionDataArray.push({title: title_acordeonRodeo, content: <Container>{series}</Container> })
              }
            }
          }

          let SubAccordionRodeo = (
            <Container>
              <Accordion
                dataArray={subAccordionDataArray}
              />
            </Container>
          )

          dataArray.push({ title: title_acordeonTemporada, content: SubAccordionRodeo })

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
                <Title>Rodeos</Title>
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
    )}
  </Query>
)

export default Rodeo;

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
