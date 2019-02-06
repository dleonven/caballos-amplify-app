import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, Header, Body, Title } from "native-base";
const routes = ["Buscar", "Genealogía", "Rodeos", "Exposiciones", "Hijos", "Línea Materna", "Fotos"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Header>
            <Body>
              <Title>Menú</Title>
            </Body>
          </Header>
          <List
           dataArray={routes}
           renderRow={data => {
             return (
               <ListItem
                 button
                 onPress={() => this.props.navigation.navigate(data)}>
                 <Text>{data}</Text>
               </ListItem>
             );
           }}
         />
        </Content>
      </Container>
    );
  }
}
