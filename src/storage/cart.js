import AsyncStorage from '@react-native-async-storage/async-storage';


const CART_KEY = '@shopping_cart';


export const loadCart = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(CART_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Failed to load cart:", e);
        return [];
    }
};


export const saveCart = async (cart) => {
    try {
        const jsonValue = JSON.stringify(cart);
        await AsyncStorage.setItem(CART_KEY, jsonValue);
    } catch (e) {
        console.error("Failed to save cart:", e);
    }
};


export const addToCart = async (product) => {
    const cart = await loadCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        
        cart[existingProductIndex].quantity += product.quantity; 
    } else {
        
        cart.push({ ...product, quantity: product.quantity });
    }
    
    await saveCart(cart);
};


export const removeFromCart = async (productId) => {
    const cart = await loadCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    await saveCart(updatedCart);
};


export const updateProductQuantity = async (productId, newQuantity) => {
    const cart = await loadCart();
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        if (newQuantity > 0) {
            existingProduct.quantity = newQuantity; 
        } else {
            
            const updatedCart = cart.filter(item => item.id !== productId);
            await saveCart(updatedCart);
            return;
        }
    }
    
    await saveCart(cart);
};


export const getTotalCount = async () => {
    const cart = await loadCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};


export const getTotalPrice = async () => {
    const cart = await loadCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};


export const clearCart = async () => {
    await AsyncStorage.removeItem(CART_KEY);
};
