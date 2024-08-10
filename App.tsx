import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = (): React.JSX.Element => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        guardarCargando(true);
        // Consultar la Api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const cotizacion = await axios.get(url);

        // Ocultar el spinner y mostrar el resultado
        guardarResultado(cotizacion.data.DISPLAY[criptomoneda][moneda]);
        guardarConsultarApi(false);
        guardarCargando(false);
      }
    };
    cotizarCriptomoneda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultarApi]);

  // Mostrar el spinner o el resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.Black : Colors.White,
  };

  return (
    <ScrollView style={backgroundStyle}>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarApi={guardarConsultarApi}
        />
      </View>
      <View style={{marginTop: 40}}>{componente}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
