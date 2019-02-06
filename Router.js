import React, { Component } from "react";
import Search from './SearchHorse'
import Genealogia from "./Genealogia";
import Rodeos from "./Rodeos";
import Exposiciones from "./Exposiciones";
import Hijos from "./Hijos";
import LineaMaterna from "./LineaMaterna";
import ListCaballos from "./ListCaballos";
import Photos from "./Photos";
import SideBar from "./SideBar";

import { createDrawerNavigator } from "react-navigation";

const Router = createDrawerNavigator(
  /*the screens defined here will have access to the navigation prop*/
  {
    Buscar: {
      screen: Search
    },
    Resultados: {
      screen: ListCaballos
    },
    Genealogía: {
      screen: Genealogia
    },
    Rodeos: {
      screen: Rodeos
    },
    Exposiciones: {
      screen: Exposiciones
    },
    Hijos: {
      screen: Hijos
    },
    'Línea Materna': {
      screen: LineaMaterna
    },
    Fotos: {
      screen: Photos
    }
  },
  {
    /*https://reactnavigation.org/docs/en/drawer-navigator.html
    Component used to render the content of the drawer, for example, navigation
    items. Receives the navigation prop for the drawer. Defaults to DrawerItems*/
    contentComponent: props => <SideBar {...props} />
  }
);
export default Router;
