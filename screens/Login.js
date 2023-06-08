import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Alert, ImageBackground, Dimensions } from 'react-native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../firebase/Firebase'

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateUser = () => {
    /*hacemos la validacion de que los campos esten correctamente llenos hacemos uso de la funcion de js trim que se
      utiliza para eliminar espacios en blanco*/
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Falló", "Debes completar todos los campos");
      return;
    }

    /*creamos los usuarios y enviamos como parametros email, contraseña y la funcion de firebase auth para que verifique si existe o no*/
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate('Home')
      
    })
    .catch(error => {
      Alert.alert("Falló", error.message);
      console.log("error", error.message)
    })
  }


  const handleLogin = () => {
    /*Creamos la funcion para logearnos y enviamos como parametros el email contraseña y la funcion auth para que verifique en firebase
    si ya existe una cuenta y nos de acceso */
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Falló", "Debes completar todos los campos");
      return;
    }
    /*una promesa es un objeto que representa la eventual finalización o fracaso de una operación asincrónica */
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      setEmail("");
      setPassword("");
      navigation.navigate('Home')
    })

    .catch(error => {
      console.log("error", error.message)
      if (error.code === "auth/user-not-found"){
        Alert.alert("Usuario no registrado", "Debes crear una cuenta primero");
      }
      else if (error.code === "auth/wrong-password") {
        Alert.alert("Contraseña incorrecta", "La contraseña ingresada es incorrecta");
      }
    })
  };


  return (

    <View style={styles.container}>

      <ImageBackground style={styles.background} source={{ uri: 'https://static.vecteezy.com/system/resources/previews/001/972/049/non_2x/low-poly-grey-and-white-background-design-with-geometric-triangles-free-vector.jpg' }}>
      {/* <Image style={styles.logo} /> */}
      <Image style={styles.logo} source={{ uri: 'https://lh3.googleusercontent.com/RkhygFbu6BRBIfjMIgQ0HMuYu8VdHwef68HY7XeGwSMh-ghDDW_MUUSaNofXYvpfUSQ_E2GKiTNibFR22ip-wNRihC22T2iUgUMUg3eN533OFoYX7MY7U_CZjmEzLfbMx-YfVNoPDmlxmlYRXK_ByBqK45btVN05di3LsTXecyB3DXerp1qsIAGLloiORfpdvXG_YCfXF7WvK7Q744SjTtChfvwQ9whby3M3v6cRO0zDns6zSPif-BuIpxFPiZhBphUaMWh0D8ylD2Xysi-NgnDq_drhiJ0rjVtZleGZx2LhOp4L7k99Z8x4sFkMxzJyHllB50ifjF54LOe29xn7G9kKGp1HQIdmq3eFcduzVJeZ7pSrKXuv8MUe0iB7sS_FVPiXuuljexOs5E71ArF5uX9tNZmv99u6ZKua0UhO4RliaiyrCL78Nv5SNPkJkaS6Q-ul_Qn1D6FKnlJnuotUHp7AYredMwEvCcK89RpWLGAMLLc8mmmCCBw8bQL4WzRatmj61TNnVcPCGfuGtZTo0WlUWGcVHyn_YyNX5MgEWg6YaEjZxHFVwPKL-T38JXnmtkx2lRpYjv8X6ZkMU9ca1hpdexBxWcemaEtMU0qET3OLyObxahuLeZAe2XGuvG4cD0erN899Gy5B7s_lyMsBRCKeav7PFlSY03IZrF3jxBV4GNn_lb7B-Gym-zZ9gCEL-89i-Qr-aCy_HmCb71v4lF2AjtwrUfcG7f1wVblAlHa2OY8Qb7YP04a6Ngm8YAXvgTZ7P4C_wJS4nqx8NJ5H34nHFRM7kyg5qJNUoIrFyTgJJ2YrAoATAiEC4fGgd6JKJEWykxKfFeeFl7rSQ2A2CESSbTxar1O0IACjLWRDpgQNnd0ztFH7c8GH49PSdRxoMU9aUkfy9K0s5rzgkzAw5wmI9bjYQ0EFKeS-s2oq8gNy_A=w685-h797-s-no?authuser=0' }} />

{/*------------------------------------- CAMPOS DEL LOGIN -------------------------------------------------------------*/}

    <TouchableOpacity onPress={handleLogin}>
      <Text style={styles.texto}>USUARIO</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

    <TouchableOpacity onPress={handleLogin}>
      <Text style={styles.texto}>CONTRASEÑA</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

{/*------------------------------------------------BOTONES------------------------------------------------------------ */}

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>INICIAR SESION</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonc} onPress={handleCreateUser}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </TouchableOpacity>

      </View>

{/*--------------------------------------------------------------------------------------------------------------------*/}

      <View style={styles.foot}>
      <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1384/1384007.png' }} />
      <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670274.png' }} />
      <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1384/1384005.png' }} />
      <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3116/3116491.png' }} />
      </View>
      <Text style={styles.text}>_____________________________________</Text>
      <Text style={styles.ftext}>Jose Daniel Ortiz Rico   |   Oscar Yair Pardo Pineda </Text>
      <Text style={styles.ftext}>Cookies  |  Información Legal  |  Política de Privacidad  |  Términos y Condiciones  </Text>
      <Text></Text>
      <Text style={styles.text}>© Copyright | All Rigths Reserved</Text>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({

  text: {
    fontStyle: 'normal',
    fontSize: 15,
    marginBottom: 0,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width ,
    height: Dimensions.get('screen').height,

  },

  input: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ffff',
    marginBottom: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra (eje X y eje Y)
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
    elevation: 5, // Elevación de la sombra (para Android)
  },

  texto:{
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Color de la sombra (con transparencia)
    textShadowOffset: { width: 1, height: 0 }, // Desplazamiento de la sombra (eje X y eje Y)
    textShadowRadius: 10, // Radio de la sombra
  },

  logo:{
    height: 180,
    width: 180,
    resizeMode: 'contain',
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 170,
  },

  buttonContainer: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
  },

  button: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,

  },

  buttonc: {
    backgroundColor: '#717D7E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,

  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  icon: {
    width: 40,
    height: 40,
    marginEnd: 10,
    marginTop: -30,
  },

  foot: {
    marginTop: 50,
    flexDirection: 'row',
    flex: 1,
  },

  ftext: {
    marginTop: 10,
    marginEnd: 20,
    marginStart: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
  }


});


export default Login;