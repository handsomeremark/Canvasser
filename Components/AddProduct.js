import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [fileName, setFileName] = useState('');

    const handleSelectFile = () => {
        setFileName('SelectedFile.jpg'); 
    };

    const handleSubmit = () => {
        console.log({
            productName,
            category,
            price,
            description,
            fileName,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Product Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter product name"
                    value={productName}
                    onChangeText={setProductName}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter category"
                    value={category}
                    onChangeText={setCategory}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter price"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    
                />
            </View>

            <TouchableOpacity style={styles.fileButton} onPress={handleSelectFile}>
                <FontAwesome5 name="upload" size={20} color="#fff" />
                <Text style={styles.fileButtonText}>Upload Photo</Text>
            </TouchableOpacity>
            {fileName ? <Text style={styles.fileName}>{fileName}</Text> : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        fontSize: 12,
    },
    fileButton: {
        flexDirection: 'row',
        backgroundColor: '#336841',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    fileButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    fileName: {
        marginBottom: 20,
        fontSize: 16,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddProduct;
