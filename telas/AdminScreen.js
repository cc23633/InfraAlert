import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Define the API base URL - Use the exposed URL
const API_URL = 'http://localhost:3000/api';

// Placeholder for fetching the auth token (replace with actual implementation)
const getAuthToken = async () => {
  // In a real app, retrieve the token stored during login (e.g., from AsyncStorage)
  // For now, we might need to pass it or handle auth differently.
  // Returning null to indicate potential lack of auth for admin actions.
  console.warn('Auth token retrieval not implemented for AdminScreen');
  return null; // Or return a hardcoded token for testing if necessary
};

export default function AdminScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState(''); // Add email state if needed

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      // TODO: Add Authorization header if token is available and required by backend
      // const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${API_URL}/users`); // Assuming GET /api/users is the endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch users when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await getAuthToken();
              // const headers = token ? { Authorization: `Bearer ${token}` } : {};
              await axios.delete(`${API_URL}/users/${userId}`);
              Alert.alert('Sucesso', 'Usuário excluído.');
              fetchUsers(); // Refresh the list
            } catch (error) {
              console.error('Error deleting user:', error.response ? error.response.data : error.message);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          },
        },
      ]
    );
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditName(user.name || '');
    setEditEmail(user.email || ''); // Set email if editing email is intended
    setModalVisible(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser || !editName) {
        Alert.alert('Erro', 'Nome não pode ser vazio.');
        return;
    }
    try {
      const token = await getAuthToken();
      // const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(`${API_URL}/users/${selectedUser.id}`, {
        name: editName,
        // email: editEmail, // Uncomment if email update is allowed
      });
      Alert.alert('Sucesso', 'Usuário atualizado.');
      setModalVisible(false);
      setSelectedUser(null);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name || 'Nome não definido'}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
          <FontAwesome name="pencil" size={20} color="#19549C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.actionButton}>
          <FontAwesome name="trash" size={20} color="#db4437" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color="#19549C" /></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Administração de Usuários</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#19549C"]} />
        }
      />

      {/* Edit User Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedUser(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar Usuário</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome"
              value={editName}
              onChangeText={setEditName}
            />
            {/* Add email input if needed */}
            {/* <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            /> */}
            <View style={styles.modalButtons}>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
                <Button title="Salvar" onPress={handleUpdateUser} color="#19549C"/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#19549C',
    marginBottom: 20,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15,
    padding: 5, // Add padding for easier touch
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 10,
  }
});

