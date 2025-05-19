import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* título */}
      <Text style={styles.welcome}>Bem-vindo de volta!</Text>

      {/* cartão branco */}
      <View style={styles.card}>

        {/* email */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          autoCapitalize="none" // não deixar a primeira letra maiúscula 🔥
        />

        {/* senha */}
        <Text style={[styles.label, { marginTop: 12 }]}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry // para esconder a senha
          autoCapitalize="none" // não deixar a primeira letra maiúscula 🔥
        />

        {/* botão login */}
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>

        {/* ícones sociais */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="google" size={24} color="#db4437" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="facebook" size={24} color="#1877f2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* links */}
      <TouchableOpacity> 
        <Text style={styles.linkSmall}>
          Esqueceu sua senha? <Text style={styles.linkUnderline}>Clique aqui</Text>
        </Text>
      </TouchableOpacity>

      {/* bloco “Ainda não possui cadastro?” */}
      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkSmall}>
            Ainda não possui cadastro? {'\n'}
            <Text style={styles.linkUnderline}>Cadastre-se</Text>
        </Text>
       </TouchableOpacity>

    </View>
  );
}

const BLUE = '#19549C';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  welcome: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  label: {
    color: '#333',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  loginBtn: {
    backgroundColor: BLUE,
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 18,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSmall: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  linkUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
