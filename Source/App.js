import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  StatusBar
} from 'react-native';
import { StackNavigator } from "react-navigation";
import { SwitchNavigator } from "react-navigation";
import { fromLeft,fadeIn,zoomIn,zoomOut } from 'react-navigation-transitions';

import Draw from './screens/Draw';
import Social from './screens/Social';
import Auth from './screens/Auth';
import Filters from './screens/Filters';
import Search from './screens/Search';
import Animate from './screens/Animate';
import Streetview from './screens/Streetview';
import Details from './screens/Details';
import Mapview from './screens/Mapview';
import Bookvisit from "./screens/Bookvisit";
import bgtest from "./screens/bgtest";
import List from './screens/List';
import Cluster from './screens/Cluster';
import Marketreport from './screens/Marketreport'
import Welcome from './screens/Welcome'
import Login from './screens/Login';
import Register from './screens/Register';
import Openhouse from './screens/Openhouse';
import Authloading from './screens/Authloading';
import Requestinfo from './screens/Requestinfo';
import Terms from './screens/Terms';



const Data = StackNavigator({
draw : {screen : Draw},
social : {screen : Social},
auth : {screen : Auth},
filters : {screen : Filters},
search : {screen : Search},
animate: {screen : Animate},
street : {screen : Streetview},
details : {screen : Details},
list : {screen : List},
cluster : {screen : Cluster},
mapview : {screen : Mapview},
bookvisit :{screen : Bookvisit},
bg : {screen : bgtest},
mkrepo : {screen : Marketreport},
//welcome : {screen : Welcome},
//login: {screen : Login},
//register: {screen: Register},
openhouse : {screen : Openhouse},
requestinfo : {screen : Requestinfo}
//authloading : {screen : Authloading}

},{

  initialRouteName:'search',
  //transitionConfig: () => flipY(),

}
);


const Authenticate = StackNavigator({
  welcome : {screen : Welcome},
  login : {screen : Login},
  register : {screen : Register},
  terms : {screen : Terms}
},{
  transitionConfig: () => fadeIn(),

})


const App = SwitchNavigator(
  {
    AuthLoading: Authloading,
    App: Data,
    Auth: Authenticate,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default App;
