import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-anchor-carousel';
import React, { useEffect, useState } from 'react';
import Noticias from './Noticias';
import axios from 'axios';

const TopAnime = () => {

  const navigation = useNavigation();
  const [topList, setTopList] = useState([]);
  const [topmanga, setTopmanga] = useState([]);

  const TopAnimeList = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=15');
      const data = response.data;
      setTopList(data.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const GetManga = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/manga?limit=15');
      const InfoManga = response.data;
      setTopmanga(InfoManga.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    TopAnimeList();
    GetManga();
  }, []);


  const handleAnimePress = (anime) => {
    navigation.navigate('DetallesAnime', { anime: anime });
  };

  const handleManga = (manga) => {
    navigation.navigate('DetallesManga', { manga: manga});
  };


  const renderAnimeItemTop = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleAnimePress(item)}>
      <Image
        style={styles.image}
        source={{ uri: item.images.jpg.large_image_url }}
      />
      <Text style={styles.title}>{item.title_english}</Text>
      <Text style={styles.title}>Puntuación: {item.score}</Text>
    </TouchableOpacity>
  );

  const renderManga = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleManga(item)}>
      <Image
        style={styles.image}
        source={{ uri: item.images.jpg.large_image_url }}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.title}>Puntuación: {item.score}</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, fontSize: 25 }}>TOP ANIMES</Text>
          <Carousel
            style={{ marginTop: 10, paddingLeft: 10}}
            data={topList}
            renderItem={renderAnimeItemTop}
            itemWidth={250}
            separatorWidth={20}
            ref={(c) => {
              this._carousel = c;
            }}
          />
        </View>



        <View>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, fontSize: 25 }}>TOP MANGAS</Text>
          <Carousel
            style={{ marginTop: 10, paddingLeft: 10 }}
            data={topmanga}
            renderItem={renderManga}
            itemWidth={250}
            separatorWidth={20}
            ref={(a) => {
              this._carouselmanga = a;
            }}
          />
        </View>

        <View><Noticias/></View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  card: {
    paddingTop: 2,
    margin: 4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  title: {
    padding: 5,
    paddingBottom: 0,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});


export default TopAnime;
