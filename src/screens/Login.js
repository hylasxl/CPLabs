import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({ navigation, onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = () => {
        setErrorMessage("");

        if (username.trim() === "" || password.trim() === "") {
            setErrorMessage("Username and Password cannot be empty.");
            return;
        }

        onLogin()
        navigation.replace("HomeTabs");  // Navigate to HomeTabs
    };

    const handleRegister = () => {
        navigation.navigate("RegisterScreen");
    };

    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.btnLoginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                    <Text style={styles.btnRegisterText}>Register</Text>
                </TouchableOpacity>
            </View>
        </>
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
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    loginBtn: {
        height: 50,
        backgroundColor: "#6a51ae",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    registerBtn: {
        height: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: "#6a51ae",
        borderWidth: 1,
    },
    btnLoginText: {
        color: "#fff",
        fontSize: 18,
    },
    btnRegisterText: {
        color: "#6a51ae",
        fontSize: 18,
    },
    errorText: {
        color: "red",
        marginBottom: 20,
        textAlign: "center",
    }
});

export default LoginScreen;
