import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

const CheckpointsScreen = () => {
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCheckpoint, setNewCheckpoint] = useState({ location: '', supplies: '' });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const response = await api.get('/checkpoints');
        setCheckpoints(response.data);
      } catch (error) {
        setError(`Failed to fetch checkpoints: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckpoints();
  }, []);

  const addCheckpoint = async () => {
    try {
      const response = await api.post('/checkpoints', newCheckpoint);
      setCheckpoints([...checkpoints, response.data]);
      setNewCheckpoint({ location: '', supplies: '' });
      setModalVisible(false);
    } catch (error) {
      setError(`Failed to add checkpoint: ${error.message}`);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={checkpoints}
        keyExtractor={(item) => item.id.toString()}
        style={styles.checkpoint}
        renderItem={({ item }) => (
          <View style={styles.checkpointItem}>
            <Text style={styles.checkpointLocation}>{item.location}</Text>
            <Text style={styles.checkpointSupplies}>{item.supplies}</Text>
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
          <Text style={styles.modalTitle}>Add Checkpoint</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#888"
            value={newCheckpoint.location}
            onChangeText={(text) => setNewCheckpoint({ ...newCheckpoint, location: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Supplies"
            placeholderTextColor="#888"
            value={newCheckpoint.supplies}
            onChangeText={(text) => setNewCheckpoint({ ...newCheckpoint, supplies: text })}
          />
          <TouchableOpacity style={styles.modalButton} onPress={addCheckpoint}>
            <Text style={styles.modalButtonText}>Add Checkpoint</Text>
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
  checkpoint: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  checkpointItem: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkpointLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkpointSupplies: {
    fontSize: 16,
    color: '#bbb',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#F3E601ff',
  },
  modalButton: {
    backgroundColor: '#054',
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

export default CheckpointsScreen;
