import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveProducts = async (products) => {
    try {
        const jsonValue = JSON.stringify(products);
        await AsyncStorage.setItem('@products', jsonValue);
        console.log('Products saved successfully');
    } catch (error) {
        console.error('Error saving products: ', error);
    }
};


export const loadProducts = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@products');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error loading products: ', error);
    }
};


export const removeProducts = async () => {
    try {
        await AsyncStorage.removeItem('@products');
        console.log('Products removed successfully');
    } catch (error) {
        console.error('Error removing products: ', error);
    }
};


