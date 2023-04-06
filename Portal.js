import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Portal({ navigation }) {
  const [username, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      setUsername(user?.email || '');
    };
    getUsername();
  }, []);

  const handleNavigation = (screen) => {
    setSidebarOpen(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)}>
          <Text style={styles.sidebarButton}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
      </View>
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={() => handleNavigation('ApplicationForm')}>
            <Text style={styles.sidebarItem}>Application Form</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('ApplicationReview')}>
            <Text style={styles.sidebarItem}>Application Review</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('ChangePassword')}>
            <Text style={styles.sidebarItem}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackButton}>Go back</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sidebarButton: {
    fontSize: 24,
  },
  username: {
    fontSize: 18,
    marginLeft: 10,
  },
  sidebar: {
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  sidebarItem: {
    fontSize: 16,
    padding: 5,
  },
  content: {
    flex: 1,
  },
  goBackButton: {
    fontSize: 18,
    alignSelf: 'center',
    margin: 10,
  },
});

export default Portal;