// src/screens/AddProductScreen.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveProducts, loadProducts } from '../storage/storage';

export default function AddProductScreen({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [country, setCountry] = useState('');

    const handleAddProduct = async () => {
        if (!name || !description || !price || !image || !country) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        const existingProducts = await loadProducts();

        const maxId = existingProducts.reduce((max, product) => Math.max(max, parseInt(product.id)), 0);

        const newProduct = {
            id: (maxId + 1).toString(), 
            name,
            description,
            price,
            images: image, 
            country,
            createdAt: new Date().toISOString(),
        };

        await saveProducts([...existingProducts, newProduct]);

        navigation.goBack();
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Product</Text>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
            />

            <Button title="Pick an Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}

            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});
