

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Button, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { loadProducts, saveProducts } from '../storage/storage';
import productData from '../json/data.json'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const initializeData = async () => {
        setLoading(true);
        const storedData = await loadProducts();
        if (storedData.length > 0) {
            setData(storedData);
        } else {
            await saveProducts(productData);
            setData(productData);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            initializeData(); 
        });

        initializeData(); 

        return unsubscribe;
    }, [navigation]);


    const onRefresh = async () => {
        setRefreshing(true);
        const updatedData = await loadProducts();
        setData(shuffleArray(updatedData));
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <View style={styles.item}>
                <Image source={{ uri: item.images }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.date}>Published At: {new Date(item.createdAt).toLocaleDateString('vi-VN')}</Text>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Fetching Data</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
             <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddProduct')}>
                <Text style={styles.addButtonText}>Add Product</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007BFF', 
        padding: 15,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
