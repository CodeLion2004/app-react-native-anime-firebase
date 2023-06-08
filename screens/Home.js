import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import TopAnime from '../components/TopAnime';


const Home = () => {

  return (
    <View style={styles.container}>
      <TopAnime />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -40,
    flex: 1,
  },
});

export default Home;
