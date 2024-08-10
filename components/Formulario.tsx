/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

interface FormularioProps {
  moneda: string;
  guardarMoneda: React.Dispatch<React.SetStateAction<string>>;
  criptomoneda: string;
  guardarCriptomoneda: React.Dispatch<React.SetStateAction<string>>;
  guardarConsultarApi: React.Dispatch<React.SetStateAction<boolean>>;
}
const Formulario = ({
  moneda,
  guardarMoneda,
  criptomoneda,
  guardarCriptomoneda,
  guardarConsultarApi,
}: FormularioProps) => {
  const [criptomonedas, guardarCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);

  const cotizarPrecio = () => {
    if (
      !moneda ||
      !criptomoneda ||
      moneda.trim() === '' ||
      criptomoneda.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }
    guardarConsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={mon => guardarMoneda(mon ? mon.toString() : '')}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={crip => guardarCriptomoneda(crip ? crip.toString() : '')}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map((cripto: any) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.txtCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  txtCotizar: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
  },
});

export default Formulario;
