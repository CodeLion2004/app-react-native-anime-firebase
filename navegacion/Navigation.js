import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, View, Text } from 'react-native';

// Screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Favoritos from '../screens/Favoritos';
import DetallesAnime from '../screens/DetallesAnime';
import DetallesManga from '../screens/DetallesManga';

//componentes 
import BuscarAnime from '../components/SearchAnime';
import TopAnime from '../components/TopAnime';


const Stack = createStackNavigator(); //creamos la pila de nuestras screens 
const Tab = createBottomTabNavigator();//creamos el menu de navegacion 

const HomeTab = () => (

  <Tab.Navigator>

    <Tab.Screen
      name='Inicio'
      component={Home}
      options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
              style={styles.logo}>
            </Image>
            <Text style={styles.title}>Inicio</Text>
          </View>
        ),
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons
            name="home"
            size={size}
            color={color} />,

        tabBarActiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
        // headerShown: false,
      }}
    />


    <Tab.Screen
      name="Buscar"
      component={BuscarAnime}
      options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
              style={styles.logo}>
            </Image>
            <Text style={styles.title}>Buscar Anime</Text>
          </View>
        ),
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons
            name="card-search"
            size={size}
            color={color} />,
        tabBarActiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
      }}
    />


    <Tab.Screen
      name="Favoritos"
      component={Favoritos}
      options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
              style={styles.logo}>
            </Image>
            <Text style={styles.title}>Favoritos</Text>
          </View>
        ),
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons
            name="star"
            size={size}
            color={color} />,
        tabBarActiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
      }}
    />


    <Tab.Screen
      name="Perfil"
      component={Profile}
      options={{
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
              style={styles.logo}>
            </Image>
            <Text style={styles.title}>Perfil</Text>
          </View>
        ),
        tabBarIcon: ({ color, size }) =>
          <MaterialCommunityIcons
            name="account" size={size}
            color={color} />,
        tabBarActiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
      }}
    />
  </Tab.Navigator>
);


/*AQUI CREAMOS LA PILA PARA LAS PANTALLAS */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />

        <Stack.Screen name="TopAnime" component={TopAnime} options={{ headerShown: false }} />

        <Stack.Screen name="DetallesAnime" title="Detalles Anime" component={DetallesAnime}
          options={{
            headerShown: true, headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
                  style={styles.logo}>
                </Image>
                <Text style={styles.title}>Detalles Anime</Text>
              </View>
            ),
          }} />

        <Stack.Screen name="DetallesManga" component={DetallesManga} options={{
          headerShown: true, headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: 'https://i.pinimg.com/originals/43/33/52/4333523659e9bedd80c0010065af72ea.png' }}
                style={styles.logo}>
              </Image>
              <Text style={styles.title}>Detalles Manga</Text>
            </View>
          ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 54,
    height: 37,
    marginStart: 0,
    marginEnd: 10,
  },

  title: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
  }
});

export default AppNavigator;
