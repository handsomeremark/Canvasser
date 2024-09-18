import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';  
import BottomNavigationBar from '../BottomNavigationBar';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch products function
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://10.10.8.207:5000/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
            filterProducts(data, selectedCategory); 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Filter products based on category
    const filterProducts = (products, category) => {
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterProducts(products, category);
    };

    // Fetch products when the component is focused
    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    // Handle refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#23483B" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Vegetables" value="Vegetables" />
                <Picker.Item label="Spices" value="Spices" />
                {/* Add more categories as needed */}
            </Picker>
            
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.flatListContent}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                            style={styles.productImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productCategory}>{item.category}</Text>
                            <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#23483B']} 
                    />
                }
            />
            <BottomNavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    flatListContent: {
        paddingBottom: 80,
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productCategory: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    productPrice: {
        fontSize: 16,
        color: '#00b050',
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Products;
