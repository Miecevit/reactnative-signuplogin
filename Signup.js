import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './components/Logo.js';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return emailRegex.test(email);
  }

  const kayit = async () => {

    if(!isValidEmail(email)){
      Alert.alert('Invalid Email', 'Lütfen tam bir mail adresini giriniz.');
      return;
    }

    try{

      await AsyncStorage.setItem(
                  'yeniKayit', 
                  JSON.stringify({email, password}),
      );

      Alert.alert('Kayıt Başarılı', 'Şimdi giriş yapabilirsiniz');
      console.log( JSON.parse(await AsyncStorage.getItem('yeniKayit')) );
      
    }catch(error){
      Alert.alert('Hata', 'Kayıt oluşturulurken hata oluştu.');
    }
  };

  return(
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Mail adresiniz"
        keyboardType="email-address" />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifreniz"
        secureTextEntry />
        <Button title="Kayıt ol" onPress = {kayit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
