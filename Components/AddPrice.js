import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddPrice = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [comments, setComments] = useState('');

    const handleSave = () => {
        // Handle save logic
        console.log({
            selectedProduct,
            currentPrice,
            newPrice,
            comments,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Select Product</Text>
            <Picker
                selectedValue={selectedProduct}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedProduct(itemValue)}
            >
                <Picker.Item label="Select a product" value="" />
                <Picker.Item label="Product 1" value="product1" />
                <Picker.Item label="Product 2" value="product2" />
                <Picker.Item label="Product 3" value="product3" />
            </Picker>

            <Text style={styles.label}>Current Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter current price"
                keyboardType="numeric"
                value={currentPrice}
                onChangeText={setCurrentPrice}
            />

            <Text style={styles.label}>New Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new price"
                keyboardType="numeric"
                value={newPrice}
                onChangeText={setNewPrice}
            />

            <Text style={styles.label}>Comments</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter comments"
                multiline
                numberOfLines={4}
                value={comments}
                onChangeText={setComments}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel')}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    textArea: {
        height: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddPrice;
