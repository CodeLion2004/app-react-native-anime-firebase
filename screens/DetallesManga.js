import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, WebView} from 'react-native';
import axios from 'axios';

const DetallesManga = ({ route }) => {

  const { manga } = route.params;
  const [cap_manga, setCap_manga] = useState([]);
  

  const getManga = async () => {
    try {
      console.log('el valor del manga es :', manga.mal_id);
      const response = await axios.get(`https://api.jikan.moe/v4/manga/${manga.mal_id}/full`);
      const infoManga = response.data;
      setCap_manga(infoManga.data);

    } catch (error) {
      console.log('Error:', error);
    }
  };


  useEffect(() => {
    getManga();
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>

        <Image style={styles.image} source={{ uri: manga.images.jpg.large_image_url }} />

        <View style={styles.containertitulo}>
          <TouchableOpacity style={styles.buttonc}>
          <Text style={styles.title}>{manga.title_english}</Text>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center', marginStart: 10}}>
            <Text>♦ Volumenes: {manga.volumes}</Text>
            <Text>♦ Estado: {manga.status}</Text>
            <Text>♦ Genero: {manga.genres[0].name}</Text>
            <Text>♦ Popularidad {manga.popularity}</Text> 
            <Text style={styles.score}>♦ Puntuación: {manga.score}</Text>
            {/* <Text>Capitulos: {cap_manga.chapters}</Text> */}

        </View>
        
          <Text style={styles.synopsis}>SINOPSIS</Text>
        
            <View style={styles.cajaDesplegable}>
              <Text style={styles.textoDesplegado}>{manga.synopsis}</Text>
            </View>
    
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
    marginStart: 8,
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
    marginStart: 140,
    marginBottom: 0,
    borderRadius: 8,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 10,
    color: 'white',
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    justifyContent: 'flex-start',
  },
  episode: {
    marginTop: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
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
});

export default DetallesManga;
