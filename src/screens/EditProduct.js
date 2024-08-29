import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveProducts, loadProducts } from '../storage/storage';

const EditProductScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());
    const [image, setImage] = useState(product.images);
    const [country, setCountry] = useState(product.country);

    const handleEditProduct = async () => {
        if (!name || !description || !price || !country) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        
        const updatedProduct = {
            ...product,
            name,
            description,
            price: parseFloat(price), 
            images: image, 
            country,
        };

        
        const existingProducts = await loadProducts();
        const updatedProducts = existingProducts.map((item) =>
            item.id === product.id ? updatedProduct : item
        );

        
        await saveProducts(updatedProducts);

        
        navigation.navigate("HomeTabs");
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
            <Text style={styles.title}>Edit Product</Text>
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

            <Button title="Pick a New Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Image source={{ uri: product.images }} style={styles.image} />

            <Button title="Save Changes" onPress={handleEditProduct} />
        </View>
    );
};

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
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default EditProductScreen;
