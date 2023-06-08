import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const Noticias = () => {
  
  const Button_Noticias = () => {
    Linking.openURL('https://www.anmosugoi.com/');
  };

  const images = [
    { uri: 'https://i.ytimg.com/vi/-vz7chgX3qk/maxresdefault.jpg' },
    { uri: 'https://i.ytimg.com/vi/W59zZtLPOEA/maxresdefault.jpg' },
    { uri: 'https://pbs.twimg.com/media/FqvmOp5WwAEJZIY.jpg:large' },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={Button_Noticias} style={styles.card}>
        <Image source={item} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NOTICIAS</Text>
      <Carousel
        style={{marginTop: 20, marginBottom: 20}}
        data={images}
        renderItem={renderItem}
        itemWidth={250}
        separatorWidth={20}
        ref={(c) => {
          this._carousel = c;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 0,

  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 0,
  },
  card: {
    alignItems: 'center',
    marginHorizontal: 5,
    paddingRight: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default Noticias;