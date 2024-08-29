import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";

import Venta from "./src/venta/index";
import Factura from "./src/facturas/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PantallaInicio from "./src/venta/inicio";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Módulo de ventas" component={PantallaInicio} />
      <Stack.Screen name="Venta" component={Venta} />
    </Stack.Navigator>
  );
};

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "venta",
      title: "Venta",
      focusedIcon: "purse",
      unfocusedIcon: "purse-outline",
    },
    { key: "factura", title: "Factura", focusedIcon: "table" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    venta: HomeStack,
    factura: Factura,
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default MyComponent;

// Librerias Usadas
// Libreria de Stepper
// https://github.com/danilrafiqi/react-native-stepper-ui/tree/f2f057fdc154980106cd72044d2ae0ff7055b29b
// Libreria estilos
// react-native-material
// https://react-native-material.com/docs/layout/box
// react-native-paper
// https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator
// Libreria Datepicker
// https://github.com/henninghall/react-native-date-picker
// Libreria SelectDropdonw
// https://github.com/AdelRedaa97/react-native-select-dropdown/tree/d0c6d8acd346ff0b47a9bb32a902b52022644f6d
