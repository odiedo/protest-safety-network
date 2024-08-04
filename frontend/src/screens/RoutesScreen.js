import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../api';

const RoutesScreen = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
      } catch (error) {
        setError(`Failed to fetch routes: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#1e90ff" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        style={styles.route}
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDetails}>{item.start_location} - {item.end_location}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F3E601ff',
    marginBottom: 24,
  },
  route: {
    width: '100%',
    paddingHorizontal: 10,
  },
  routeItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054',
  },
  routeDetails: {
    fontSize: 16,
    color: '#b0b0b0',
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

export default RoutesScreen;
