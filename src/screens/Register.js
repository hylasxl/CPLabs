import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const RegisterScreen = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { navigation, setIsLoggedIn } = props; 

    const handleRegister = () => {
        setErrorMessage("");

        if (username.trim() === "" || password.trim() === "" || email.trim() === "") {
            setErrorMessage("All fields are required.");
            return;
        }

        setIsLoggedIn(true); 
        navigation.navigate("HomeTabs");
    };

    const handleBackToLogin = () => {
        navigation.navigate("LoginScreen");
    };

    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
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
                <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                    <Text style={styles.btnRegisterText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={handleBackToLogin}>
                    <Text style={styles.btnBackToLoginText}>Back to Login</Text>
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
    registerBtn: {
        height: 50,
        backgroundColor: "#6a51ae",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    loginBtn: {
        height: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: "#6a51ae",
        borderWidth: 1,
    },
    btnRegisterText: {
        color: "#fff",
        fontSize: 18,
    },
    btnBackToLoginText: {
        color: "#6a51ae",
        fontSize: 18,
    },
    errorText: {
        color: "red",
        marginBottom: 20,
        textAlign: "center",
    }
});

export default RegisterScreen;
