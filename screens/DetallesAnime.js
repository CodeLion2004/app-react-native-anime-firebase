import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';


const DetallesAnime = ({ route }) => {
  const { anime } = route.params;
  const [episodios, setEpisodios] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [sinopsisVisible, setSinopsisVisible] = useState(false);
  

  // Obtener episodios
  const getEpisodios = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes`);
      const infoEpisodios = response.data;
      setEpisodios(infoEpisodios.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Obtener información del trailer
  const getTrailer = async () => {
    try {
      console.log('el valor del anime es :', anime.mal_id);
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}/full`);
      const infoTrailer = response.data;
      setTrailer(infoTrailer.data.trailer);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Visibilidad para el contenido de la sinopsis
  const toggleSinopsisVisibility = () => {
    setSinopsisVisible(!sinopsisVisible);
  };

  useEffect(() => {
    getEpisodios();
    getTrailer();
  }, []);

  return (
    <ScrollView>
      {/* Agregar un elemento View para mostrar el trailer */}
      {/* Agregar una condición para verificar si el anime tiene trailer o no */}
      <View style={styles.container}>
        {trailer ? (
          <View>
            <WebView
              source={{ uri: trailer.embed_url }}
              style={{ width: '100%', height: 300 }}
            />
          </View>
        ) : null}

        <View style={styles.containertitulo}>
          <TouchableOpacity style={styles.buttonc}>
          <Text style={styles.title}>{anime.title_english}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={toggleSinopsisVisibility}
          style={styles.containersynopsis}
        >
          <Text style={styles.synopsis}>SINOPSIS</Text>
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', marginStart: 10, marginStart: 10 }}>
          <Text style={styles.info}>♦ Duracion: {anime.duration}</Text>
          <Text style={styles.info}>♦ Episodios: {anime.episodes}</Text>
          <Text style={styles.info}>♦ Genero: {anime.genres[0].name}</Text>
          <Text style={styles.score}>♦ Puntuación: {anime.score}</Text>
        </View>

        {sinopsisVisible && (
          <View style={styles.cajaDesplegable}>
            <Text style={styles.textoDesplegado}>{anime.synopsis}</Text>
          </View>
        )}

          <TouchableOpacity style={styles.buttonEpi}>
        <Text style={styles.sectionEpi}>EPISODIOS</Text>
          </TouchableOpacity>

        {episodios.map((episodio) => (
          
          <TouchableOpacity key={episodio.mal_id} style={styles.episode}>
            <Image style={styles.logo} source={{ uri: 'https://img.icons8.com/?size=512&id=MKGQ2TscSYml&format=png' }}></Image>
            <Text style={styles.infoepi}>{episodio.title} </Text>
            <Text style={styles.infoepi}>Episodio: {episodio.mal_id} </Text>
            <Text style={styles.infoepi}>Puntuacion {episodio.score} </Text>
          </TouchableOpacity>
          
        ))}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 1,
    resizeMode: 'contain',
  },
  containertitulo: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white',
  },
  synopsis: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'gray',
    height: 25,
    width: 80,
    marginStart: 145,
    marginBottom: 10,
    borderRadius: 8,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 5,
    color: 'white',
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    justifyContent: 'flex-start',
    marginStart: 10,
  },
  sectionEpi:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    justifyContent: 'flex-start',
    marginStart: 122,
    color: 'white',
  },
  episode: {
    marginTop: 2,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#D5D2D2',
    marginBottom: 2,
  },
  cajaDesplegable: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: 'black',
  },
  buttonc: {
    backgroundColor: '#BF0707',
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    paddingBottom: 17,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonEpi: {
    backgroundColor: '#000000',
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    marginTop: 15,
  },
  info: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  infoepi: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    textAlign: 'center',
  },
  score:{
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 2,
    marginStart: 145,
  },
});

export default DetallesAnime;
