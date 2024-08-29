import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function Button({ label, theme, onPress }) {
    if (theme === "primary") {
        return (
            <View style={styles.container}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#007bff' }]} 
                    onPress={onPress}
                >
                    <Text style={[styles.label, { color: '#fff' }]}>
                        {label}
                    </Text>
                </Pressable>
            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
