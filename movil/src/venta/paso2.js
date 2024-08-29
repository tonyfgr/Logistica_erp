import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { Button, Card, IconButton } from "react-native-paper";

import SearcherProductos from "./searcher";
import { ACTION_TYPES } from "./reducer";
import Table from "./table";
import { searcher, get } from "../services/ventas";
import {  useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const Paso2 = ({ state, dispatch }) => {
  const [click, setClick] = useState(0);
  console.log(state);
  const handleAdd = (item) => {
    console.log(item);
    setClick((a) => a + 1);
    //building the payload
    let payload = {
      nombre: `${item.producto}/${item.nombre}`,
      producto: item.id,
      unidad: 1,
      cantidad: 1,
      precio_unitario: item.precio_venta,
    };
    var action = {
      type: ACTION_TYPES.ADD_DETALLE,
      payload,
    };
    dispatch(action);
  };

  const handleRemove = (item) => {
    setClick((a) => a - 1);
    let payload = {
      producto: item.id,
    };
    var action = {
      type: ACTION_TYPES.LOW_DETALLE,
      payload,
    };
    dispatch(action);
  };

  //para el buscador de productos
  const render = React.useRef(true);
  const [fields, setFields] = useState({});
  const URL = "api/productos/variantes/";
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      get(setProductos, URL);
    }
  }, []);
  let data = searcher(fields, productos);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }
  console.log(fields)

  return (
    <View onStartShouldSetResponder={() => true}>
      <View>
        <SearcherProductos  fields={fields} setFields={setFields}/>
        <ScrollView style={styles.scrollViewWrapper} horizontal={true}>
          <View style={styles.cardContainer}>
            {data.map((item, i) => (
              <Card key={i} style={styles.cardStyle}>
                <Card.Title
                  title={<Text style={{fontFamily:'Poppins_400Regular'}}>{item.producto + "/" + item.nombre}</Text>}
                  subtitle={item.precio_unitario}
                />
                <Card.Cover
                  source={item.imagen}
                  style={styles.cardImageStyle}
                />
                <Card.Actions>
                  <IconButton
                    icon="delete"
                    color="red"
                    size={15}
                    onPress={() => handleRemove(item)}
                  />
                  <IconButton
                    icon="plus"
                    color="secondary"
                    size={15}
                    onPress={() => handleAdd(item)}
                  />
                </Card.Actions>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
      <View>
        <Table state={state} dispatch={dispatch} click={click} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    maxHeight: "60vh",
  },
  cardStyle: {
    width: "10rem",
    margin: "3px",
  },
  cardImageStyle: {
    maxWidth: "10rem",
    maxHeight: "10rem",
    marginHorizontal: 10,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Paso2;
