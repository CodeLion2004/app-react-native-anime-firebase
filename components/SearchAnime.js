import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BuscarAnime = () => {

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [animeList, setAnimeList] = useState([]);

  
  const handleSearch = async () => {
    if (search.trim() === '') {
      setAnimeList([]);
      return;
    }

    try {
      const a = await axios.get(`https://api.jikan.moe/v4/anime?q=${search}`);
      const list = a.data
      setAnimeList(list.data)
      console.log(list.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };


  /*con este useEffect hacemos que se ejecute la funcion cada vez que el valor de search cambie*/
  useEffect(() => {
    handleSearch()
  }, [search])


  const handleAnimePress = (anime) => {
    navigation.navigate('DetallesAnime', { anime: anime });
  };

  //se crear el objeto para acceder a las propiedades expecificas de cada elemento
  const renderAnimeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.CardImagenes}
      onPress={() => handleAnimePress(item)}
    >
      <Image
        style={{ width: '100%', height: 180, borderRadius: 8 }}
        source={{ uri: item.images.jpg.large_image_url }}
      />
      <Text style={styles.title}>Título: {item.title_english}</Text>
      <Text style={styles.titlep}>Puntuación: {item.score}</Text>

    </TouchableOpacity>
  );


  return (
    <View style={{ flex: 1, backgroundColor: '#545757' }}>

      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el título del anime"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/?size=512&id=97574&format=png' }}></Image>
        </TouchableOpacity>
      </View>


      <View style={styles.containerlist}>
        <FlatList
          style={{ backgroundColor: '#CACACA' }}
          data={animeList}
          renderItem={renderAnimeItem}
          keyExtractor={(item) => item.mal_id}
          numColumns={2}
        />
      </View>


    </View>

  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
  },
  input: {
    marginLeft: 65,
    marginRight: 10,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  button: {
    backgroundColor: '#BF0707',
    borderRadius: 10,
    padding: 5,
  },
  containerlist: {
    flex: 1,
    marginTop: 8,
    justifyContent: 'center',
  },
  CardImagenes: {
    width: Dimensions.get('screen').width * 0.48,
    margin: 3,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 8,

  },
  title: {
    padding: 5,
    paddingBottom: 2,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  titlep: {
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 0,
  },
});

export default BuscarAnime