import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Surface, TextInputMask, Button } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getMan, searcher } from "../services/ventas";
// Libreria SelectDropdonw
// https://github.com/AdelRedaa97/react-native-select-dropdown/tree/d0c6d8acd346ff0b47a9bb32a902b52022644f6d
import SelectDropdown from "react-native-select-dropdown";
import {  useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const SearcherProductos = ({ fields, setFields }) => {
    const [categorias, setCategorias] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
  
      const handlerSearcher = (e, nombre) => {
        console.log(e);
        // const { name, value } = nombre, e;
        const name = nombre
        const value = e
        console.log(name, value);
        setFields({ ...fields, [name]: value });
      };
  
  //   const handlerSearcher = (e) => {
  //     const { name, value } = e.target;
  //     setFields({ ...fields, [name]: value });
  //   };
  
    useEffect(() => {
      const URL_C =
        "api/mantenimientos/categoria_productos/";
      const URL_M = "api/mantenimientos/almacenes/";
      getMan(setCategorias, URL_C);
      getMan(setAlmacenes, URL_M);
    }, []);
  
    console.log(fields);
    console.log("categorias", categorias);
    const [visible, setVisible] = React.useState(false);
  
    const hideDialog = () => setVisible(false);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <section>
      <Surface
        style={{ padding: 30, marginBottom: 20, backgroundColor: "white" }}
        elevation={5}
      >
        <Text style={{fontFamily:'Poppins_600SemiBold', fontSize:18, textAlign:'center', marginBottom:4}}>Buscar Producto</Text>
        <TextInput
          label={<Text style={{fontFamily:'Poppins_400Regular'}}>Nombre</Text>}
          type="text"
          mode="filled"
          name="nombre"
          id="textfields"
        //   onChange={handlerSearcher}
          onChangeText={(e)=>handlerSearcher(e, "nombre")}
          style={styles.textInput}
        />
        <SelectDropdown
          data={categorias}
          defaultButtonText={<Text style={{fontFamily:'Poppins_400Regular'}}>Selecciona una categoría</Text>}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            handlerSearcher(selectedItem.id, "categoria");
          }}
          rowTextForSelection={(item, index) => {
            return item.nombre;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.nombre;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          style={styles.select}
        />
        <View>
          <SelectDropdown
            data={almacenes}
            defaultButtonText={<Text style={{fontFamily:'Poppins_400Regular'}}>Selecciona un almacén</Text>}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              handlerSearcher(selectedItem.id, "almacen");
            }}
            rowTextForSelection={(item, index) => {
              return item.nombre;
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.nombre;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            style={styles.select}
          />
        </View>
      </Surface>
    </section>
  );
};

export default SearcherProductos;

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: "10%",
      paddingBottom: "20%",
    },
    dropdown1BtnStyle: {
      width: "100%",
      height: 50,
      backgroundColor: "#EFEFEF",
      marginBottom:5
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "center" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "center" },
    textInput:{
      marginBottom:5,
    },
  });
  