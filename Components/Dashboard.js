import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigationBar from './BottomNavigationBar';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => {/* Handle notification icon press */}}
          >
            <FontAwesome5 name="bell" size={24} color="#336841" />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {/* Add Product */}
          <TouchableOpacity
            style={styles.widget}
            onPress={() => navigation.navigate('Add Product')}
          >
            <FontAwesome5 name="box" size={30} color="#336841" style={styles.icon} />
            <Text style={styles.widgetText}>Add Product</Text>
          </TouchableOpacity>

          {/* Update / Add Price */}
          <TouchableOpacity
            style={styles.widget}
            onPress={() => navigation.navigate('Add Price')}
          >
            <FontAwesome5 name="dollar-sign" size={30} color="#336841" style={styles.icon} />
            <Text style={styles.widgetText}>Update / Add Price</Text>
          </TouchableOpacity>

          {/* Upload Product Details */}
          <TouchableOpacity
            style={styles.widget}
            onPress={() => navigation.navigate('Upload Product Details')}
          >
            <FontAwesome5 name="upload" size={30} color="#336841" style={styles.icon} />
            <Text style={styles.widgetText}>Upload Product Details</Text>
          </TouchableOpacity>

          {/* Receive & Process Orders */}
          <TouchableOpacity
            style={styles.widget}
            onPress={() => navigation.navigate('Receive & Process Orders')}
          >
            <FontAwesome5 name="clipboard-list" size={30} color="#336841" style={styles.icon} />
            <Text style={styles.widgetText}>Receive & Process Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.recentActivitiesTitle}>Recent Activities</Text>
          {/* Example Activity Item */}
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Product X was added</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Price updated for Product Y</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Order #123 received</Text>
          </View>
          {/* Add more activity items as needed */}
        </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 70,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
  },
  notificationIcon: {
    padding: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  widget: {
    backgroundColor: '#fff',
    width: '48%', 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginBottom: 15,
  },
  widgetText: {
    color: '#336841',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  recentActivitiesContainer: {
    marginTop: 30,
  },
  recentActivitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Dashboard;
