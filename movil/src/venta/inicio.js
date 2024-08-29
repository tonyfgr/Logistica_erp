import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { postCaja, patchCaja, getLastCaja } from "../services/ventas";
import {  useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const PantallaInicio = ({ navigation }) => {
  const [itemCaja, setItemCaja] = useState({
    estado_caja: false,
    registros_caja: [],
  });

  const handleOpenCloseCaja = async () => {
    if (itemCaja.estado_caja) {
      await patchCaja(itemCaja.id, {
        estado_caja: false,
        responsable_cierre: 1,
      });
    } else {
      await postCaja({
        estado_caja: true,
        responsable_apertura: 1,
        monto_inicial:100.0,
      });
    }
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "tesoreria");
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Venta");
          handleOpenCloseCaja();
        }}
        fontFamily="Poppins_400Regular"
      >
        {itemCaja.estado_caja == true ? <Text style={{fontFamily:'Poppins_400Regular'}}>Cerrar Caja</Text> : <Text style={{fontFamily:'Poppins_400Regular'}}>Abrir caja</Text>}
      </Button>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "35%",
  },
  step: {},
});
