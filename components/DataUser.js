import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Dimensions, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/Firebase';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const DataUser = () => {
  const [user, setUser] = useState(null);
  const [creationTime, setCreationTime] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Inicializar Firebase
    initializeApp(firebaseConfig);

    // Obtener el usuario actualmente autenticado
    const currentUser = getAuth().currentUser;
    setUser(currentUser);

    // Obtener la fecha de creación del usuario
    if (currentUser && currentUser.metadata && currentUser.metadata.creationTime) {
      const formattedCreationTime = moment(currentUser.metadata.creationTime).format('DD-MM-YYYY');
      setCreationTime(formattedCreationTime);
    }
  }, []);


  const cerrarSesion = () => {
    navigation.navigate("Login");
  }

  return (

    <View style={styles.container}>

      <ImageBackground style={styles.background} source={{ uri: 'https://static.vecteezy.com/system/resources/previews/022/541/710/non_2x/illustration-of-wallpaper-with-white-clouds-on-the-blue-bright-background-free-vector.jpg' }}>

        <Image source={{ uri: 'https://img.icons8.com/?size=512&id=GohkdjGdvari&format=png' }}
          style={styles.logo}>
        </Image>

        {user && (
          <View style={styles.info}>

            <Text style={styles.title}>{user.email}</Text>

            {creationTime && <Text style={styles.title}>Fecha de creación:  {creationTime}</Text>}

            <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
              <Text style={styles.buttonText}>CERRAR SESION</Text>
            </TouchableOpacity>

          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 300,
    width: 290,
    resizeMode: 'stretch',
    justifyContent: 'center',
    marginBottom: -10,
    marginTop: 180,
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: -200,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,

  },

  title: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 12,
    paddingTop: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: -5,
    borderWidth: 2,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

})
export default DataUser;