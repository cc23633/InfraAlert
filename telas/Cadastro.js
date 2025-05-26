import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, // Import Alert
  ScrollView, // Import ScrollView for longer content
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import axios from 'axios'; // Import axios

// Define the API base URL - Use the exposed URL
const API_URL = 'http://localhost:3000/api';

export default function Cadastro() { // Rename component to Cadastro
  const navigation = useNavigation(); // Initialize navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça o login para continuar.');
      navigation.navigate('Login'); // Navigate to Login screen after successful registration

    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Erro ao tentar cadastrar. Tente novamente.';
      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}> // Use ScrollView
      <View style={styles.container}>
        <Text style={styles.welcome}>Crie sua conta!</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Confirmar Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha novamente"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.criarBtn}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.loginText}>{loading ? 'Criando...' : 'criar conta'}</Text>
          </TouchableOpacity>

          {/* Ícones sociais - Funcionalidade não implementada */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="google" size={24} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="facebook" size={24} color="#1877f2" />
            </TouchableOpacity>
          </View>
        </View>

         {/* Link para Login */}
         <TouchableOpacity
            style={{ marginTop: 20, marginBottom: 20 }} // Add margin bottom
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkSmall}>
              Já possui uma conta? {' '}
              <Text style={styles.linkUnderline}>Faça Login</Text>
            </Text>
          </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const BLUE = '#19549C';

const styles = StyleSheet.create({
  scrollContainer: { // Style for ScrollView content
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingHorizontal: 24,
    paddingVertical: 40, // Add vertical padding
  },
  welcome: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
    backgroundColor: '#f9f9f9',
  },
  criarBtn: {
    backgroundColor: BLUE,
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  linkSmall: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
  },
  linkUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

