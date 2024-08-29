import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
const SettingsScreen = ({ navigation }) => {
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    onPress: () => {
                        
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "LoginScreen" }],
                            })
                        );
                        navigation.navigate("LoginScreen")
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={handleLogout}>
                <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 28,
        marginBottom: 40,
        textAlign: "center",
        color: "#333",
    },
    optionBtn: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#ff4d4d",
        marginBottom: 20,
    },
    optionText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default SettingsScreen;
