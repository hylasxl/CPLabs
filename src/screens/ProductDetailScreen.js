import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { loadProducts, saveProducts } from '../storage/storage'; 
import { addToCart } from '../storage/cart'; 

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1); 

    const handleDelete = async () => {
        
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const existingProducts = await loadProducts();
                        const updatedProducts = existingProducts.filter(item => item.id !== product.id);
                        await saveProducts(updatedProducts);
                        navigation.navigate("HomeTabs");
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        const productWithQuantity = { ...product, quantity }; 
        await addToCart(productWithQuantity);
        Alert.alert('Success', `${product.name} has been added to the cart with quantity ${quantity}.`);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.images }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.date}>Published At: {new Date(product.createdAt).toLocaleDateString('vi-VN')}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
                    <Text style={[styles.countryBadge, { backgroundColor: product.color }]}>
                        {product.country}
                    </Text>
                </View>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Delete Product" color="#FF4D4D" onPress={handleDelete} />
                <Button
                    title="Edit Product"
                    onPress={() => navigation.navigate('EditProduct', { product })}
                />
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    color="#2a9d8f"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2a9d8f',
        marginRight: 10,
    },
    countryBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20, 
        marginBottom: 20, 
        flexDirection: 'column', 
        gap: 10, 
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -5,
        marginTop: 10
    },
    quantityButton: {
        backgroundColor: '#2a9d8f',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 10,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
