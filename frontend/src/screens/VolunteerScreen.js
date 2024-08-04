import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Modal, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

const VolunteerScreen = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVolunteer, setNewVolunteer] = useState({ name: '', contact_info: '', role: '' });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await api.get('/volunteers');
        setVolunteers(response.data);
      } catch (error) {
        setError(`Failed to fetch volunteers: ${error.message}`);
        console.error('Error fetching volunteers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const addVolunteer = async () => {
    try {
      const response = await api.post('/volunteers', newVolunteer);
      const addedVolunteer = response.data;
      if (addedVolunteer && addedVolunteer.id) {
        setVolunteers([...volunteers, addedVolunteer]);
        setNewVolunteer({ name: '', contact_info: '', role: '' });
        setModalVisible(false);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setError(`Failed to add volunteer: ${error.message}`);
      console.error('Error adding volunteer:', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={volunteers}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        style={styles.volunteer}
        renderItem={({ item }) => (
          <View style={styles.volunteerItem}>
            <Text style={styles.volunteerName}>{item.name}</Text>
            <Text style={styles.volunteerContact}>{item.contact_info}</Text>
            <Text style={styles.volunteerRole}>{item.role}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle" size={48} color="#F3E601ff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Volunteer</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={newVolunteer.name}
            onChangeText={(text) => setNewVolunteer({ ...newVolunteer, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Info"
            placeholderTextColor="#888"
            value={newVolunteer.contact_info}
            onChangeText={(text) => setNewVolunteer({ ...newVolunteer, contact_info: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            placeholderTextColor="#888"
            value={newVolunteer.role}
            onChangeText={(text) => setNewVolunteer({ ...newVolunteer, role: text })}
          />
          <TouchableOpacity style={styles.modalButton} onPress={addVolunteer}>
            <Text style={styles.modalButtonText}>Add Volunteer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: '#ff6347' }]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  volunteer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  volunteerItem: {
    padding: 10,
    marginTop: 10, 
    marginBottom: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  volunteerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  volunteerContact: {
    fontSize: 16,
    color: '#bbb',
  },
  volunteerRole: {
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default VolunteerScreen;
