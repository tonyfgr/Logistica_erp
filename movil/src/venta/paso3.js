import react from 'react'
import {View, Text, TextComponent, StyleSheet} from 'react-native'
import { Avatar, Card, IconButton } from 'react-native-paper';
 
const Paso3 = ({state, dispatch}) => {
    return (
      <View>
        <Card.Title
          title={<Text style={styles.text} >Se completó la venta</Text>}
          subtitle="Puedes pasar a revisar tus facturas"
          left={(props) => <Avatar.Icon {...props} icon="check" />}
        />
      </View>
    )
}

export default Paso3;

const styles = StyleSheet.create({
  
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  
});