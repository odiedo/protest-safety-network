import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerCont}>
        <Image source={require('../../assets/banner.jpg')} style={styles.banner} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Protest Safety Network</Text>
      </View>
      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('Routes')}
        >
          <Ionicons name="map" size={24} color="white" />
          <Text style={styles.buttonText}>View Routes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('Crowd')}
        >
          <Ionicons name="people" size={24} color="white" />
          <Text style={styles.buttonText}>Crowd Monitoring</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('Volunteers')}
        >
          <Ionicons name="heart" size={24} color="white" />
          <Text style={styles.buttonText}>Volunteer Network</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('Checkpoints')}
        >
          <Ionicons name="shield" size={24} color="white" />
          <Text style={styles.buttonText}>Safe Checkpoints</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  header: {
    marginTop: 3,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bannerCont: {
    width: '100%',
    height: 250,
    backgroundColor: '#F3E601ff',
    marginBottom: 24,
    marginTop: 1,
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: 250,
    objectFit: 'scale-down',
  },
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    width: '80%',
  },
  buttonHome: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#054',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 8,
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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

export default HomeScreen;
