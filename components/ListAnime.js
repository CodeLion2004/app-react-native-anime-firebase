import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, Button, ImageBackground, TouchableOpacity } from "react-native";


const ListAnime = () => {
  const [data, setData] = useState([]);

  const DATA = [
    {
      id: "1",
      title: "Black Clover",
      image: "https://cdn.myanimelist.net/images/anime/2/88336l.jpg"
    },
    {
      id: "2",
      title: "Kimetsu no yaiba",
      image: "https://cdn.myanimelist.net/images/anime/1908/120036l.jpg"
    },
    {
      id: "3",
      title: "Mashle",
      image: "https://cdn.myanimelist.net/images/anime/1218/135107l.jpg"
    },
    {
      id: "4",
      title: "Tokyo Revenge",
      image: "https://cdn.myanimelist.net/images/anime/1839/122012l.jpg"
    },
    {
      id: "5",
      title: "Chainsaw Man",
      image: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg"
    },
    {
      id: "6",
      title: "Jujutsu Kaisen",
      image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg"
    },
  ];

  useEffect(() => {
    setData(DATA);
  }, []);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      image={item.image}
      onDelete={() => deleteItem(item.id)}
    />
  );

  const Item = ({ title, image, onDelete }) => (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.eliminar}>ELIMINAR DE FAVORITOS</Text>
      </TouchableOpacity>
    </View>
  );
  
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  return (
    <View style={styles.container}>
        <ImageBackground style={styles.background} source={{ uri: 'https://img.freepik.com/vector-premium/fondo-ornamento-oriental-patrones-fisuras-nubes-tradicionales-chinas_454705-898.jpg?w=2000' }}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: "#EAEAEA",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 2,
      height: 2,
    }, 
  },
  button: {
    marginTop: 5,
    backgroundColor: '#BF0707',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
  eliminar: {
    color: 'white',
    fontWeight: "bold",
  }
});

export default ListAnime;