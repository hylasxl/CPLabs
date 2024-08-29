import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, Image } from 'react-native';
import { loadCart, removeFromCart, getTotalPrice, clearCart } from '../storage/cart'; 
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const loadCartData = async () => {
        const cartData = await loadCart();
        setCart(cartData);
        const total = await getTotalPrice();
        setTotalPrice(total);
    };

    const handleRemove = async (productId) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from the cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: async () => {
                        await removeFromCart(productId);
                        loadCartData(); 
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleCheckout = async () => {
        Alert.alert(
            'Checkout',
            'Are you sure you want to proceed to checkout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Checkout',
                    onPress: async () => {
                        await clearCart(); // Clear the cart
                        Alert.alert('Checkout Successful', 'Thank you for your purchase!');
                        loadCartData(); // Reload the cart data
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            loadCartData(); // Load cart data whenever the screen is focused
        }, [])
    );

    const renderCartItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.images }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>
                    Price: ${parseFloat(item.price).toFixed(2)}
                </Text>
                <Text style={styles.itemTotalPrice}>
                    Total: ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </Text>
                <Button title="Remove" onPress={() => handleRemove(item.id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
                    <Button
                        title="Checkout"
                        onPress={handleCheckout} // Call handleCheckout function on press
                    />
                </>
            ) : (
                <Text style={styles.emptyCartMessage}>Your cart is empty!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    itemImage: {
        width: 80, // Adjust based on your design
        height: 80, // Adjust based on your design
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1, // Take up remaining space
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 16,
        marginVertical: 5,
    },
    itemPrice: {
        fontSize: 16,
        color: '#2a9d8f',
        marginVertical: 5,
    },
    itemTotalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    emptyCartMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});

export default CartScreen;
