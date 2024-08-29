import React, {
  useState,
  Fragment,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { View, ScrollView, StyleSheet, Alert} from "react-native";
import { Text } from "react-native-paper";

import Stepper from "react-native-stepper-ui";
import Paso1 from "./paso1";
import Paso2 from "./paso2";
import Paso3 from "./paso3";

import { INITIAL_STATE, ventasReducer, ACTION_TYPES } from "./reducer";

import { BuildVentaPayload, RegistroVenta } from "../services/ventas";
import { getLastCaja } from "../services/ventas";
import {  useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        {
          handleRegister();
          handleReset();
        }
    },
  );

const Venta = () => {
  //Registration's Fuctionality
  const [state, dispatch] = React.useReducer(ventasReducer, INITIAL_STATE);
  const [itemCaja, setItemCaja] = useState({ estado_caja: false });

  //Steps's Functionality
  const [activeStep, setActiveStep] = useState(0);

  const handleReset = () => {
    dispatch({
      type: ACTION_TYPES.RESET_VENTA,
    });
    setActiveStep(0);
  };

  const handleRegister = () => {
    if (state.venta.detalle_venta.length) {
      var ingreso_venta = {
        responsable: 1,
        caja: itemCaja.id,
        tipo: "Ventas",
      };
      var payload = BuildVentaPayload(state.venta);
      payload.ingreso_venta = ingreso_venta;
      RegistroVenta(payload);
      console.log(payload);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cliente o productos NO válidos",
      });
    }
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "ventas");
  }, []);

  console.log(state);

  const content = [
    <Paso1 state={state} dispatch={dispatch} />,
    <Paso2 state={state} dispatch={dispatch} />,
    <Paso3 state={state} dispatch={dispatch} />,
  ];

  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <Stepper
          active={activeStep}
          stepStyle={{backgroundColor: '#633256', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', opacity: 1, marginBottom: '1rem'}}
          buttonStyle={{ padding: 10, borderRadius: 4, alignSelf: 'flex-start', marginRight: 10, marginTop:10, backgroundColor: '#633256', fontFamily: 'Poppins_400Regular',}}
          content={content}
          onBack={() => {
            setActiveStep((p) => -1);
            handleReset();
          }}
          onFinish={() => {
            handleRegister();
            handleReset();
          }}
          onNext={() => {
            setActiveStep((p) => p + 1);
          }}
        />
      </ScrollView>
    </View>
  );
};
export default Venta;

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: "79vh",
    margin: "2rem",
  },
  step: {

  },
});
