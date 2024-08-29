import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button } from "@react-native-material/core";
import { TextInput } from "react-native-paper";

// import DatePicker from "react-native-date-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ACTION_TYPES } from "./reducer";
import SelectDropdown from "react-native-select-dropdown";
import { getClientes } from "../services/ventas";
import {  useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const Paso1 = ({ state, dispatch }) => {
  const render = useRef(true);
  const [dataClientes, setDataClientes] = useState([]);
  // const [pickerDate, setPickerDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState([]);
  const handleChange = (e, value, ac) => {
    console.log(value);
    console.log(e);
    console.log(ac);
    let action = {
      type: ac,
    };

    switch (ac) {
      case ACTION_TYPES.SET_FECHA:
        var event = new Date(e.$d);
        let date = JSON.stringify(event);
        date = date.slice(1, -1);
        action.payload = date;
        dispatch(action);
        break;

      case ACTION_TYPES.SET_CLIENTE:
        console.log(action.payload);
        action.payload = value;
        dispatch(action);
        break;
      default:
        console.log("Acción no definida");
    }
  };

  console.log(dataClientes);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      setDataClientes;
    }
    getClientes(setCliente);
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <View contentContainerStyle={styles.scrollViewContainer}>
        <SelectDropdown
          data={cliente}
          defaultButtonText={<Text style={{fontFamily:'Poppins_400Regular'}}>Selecciona un cliente</Text>}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            handleChange(index, selectedItem, ACTION_TYPES.SET_CLIENTE);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.persona ? selectedItem.persona.nombre : selectedItem.empresa.nombre;
          }}
          rowTextForSelection={(item, index) => {
            console.log(item);
            return item.persona ? item.persona.nombre : item.empresa.nombre;
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

        {/* <DatePicker
            modal
            open={open}
            date={pickerDate}
            onConfirm={(date) => {
              setOpen(false);
              setPickerDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            onChangeText={(value) => {
              handleChange(value, null, ACTION_TYPES.SET_FECHA);
            }}
          /> */}
        <TextInput
          fullWidth
          label={<Text style={{fontFamily:'Poppins_400Regular'}}>Código Cliente</Text>}
          id="textfields"
          variant="filled"
          value={state.venta.cliente.codigo}
          style={styles.textInput}
        />
        <TextInput
          fullWidth
          label={<Text style={{fontFamily:'Poppins_400Regular'}}>DNI</Text>}
          type="number"
          id="textfields"
          variant="filled"
          value={state.venta.cliente.persona ? state.venta.cliente.persona.dni : state.venta.cliente.empresa.ruc}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};
export default Paso1;

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
    backgroundColor: "#FFF",
    marginBottom:10
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "center" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "center" },
  textInput:{
    marginBottom:10,
  }
});
