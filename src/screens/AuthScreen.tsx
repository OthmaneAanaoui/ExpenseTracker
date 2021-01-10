import React, { useContext, useState } from "react";
import { Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
//import { useStoreState } from '../hooks/hooks';
import { AntDesign } from "@expo/vector-icons";

type Props = {};

const AuthScreen: React.FC<Props> = () => {
    const auth = useAuth();
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //const { theme } = useStoreState((state) => state.themeModel);

    const codeError = (e: any) => {
        console.log(e.code);
        switch (e.code) {
            case "auth/email-already-in-use":
                Alert.alert(e.message);
                break;
            case "auth/invalid-email":
                Alert.alert(e.message);
                break;
            case "auth/weak-password":
                Alert.alert(e.message);
                break;
            case "auth/user-not-found":
                Alert.alert(e.message);
                break;
            case "auth/wrong-password":
                Alert.alert("User or password is invalid");
                break;
        }
    };

    const onPressRegister = async () => {
        if (!email || !password) {
            Alert.alert("Please fill in the fields");
            return;
        }

        if (!isRegister) {
            try {
                await auth.register(email, password);
                Alert.alert("Account was created");
                setIsRegister(true);
            } catch (e) {
                codeError(e);
            }
        }
    };

    const onPressLogin = async () => {
        try {
            await auth.signIn(email, password);
        } catch (e) {
            codeError(e);
        }
    };

    return (
        <SafeAreaView
            style={styles.droidSafeArea}>
            <Text style={styles.title}>
                Welcome in Note Application
            </Text>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.title}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                style={styles.containerButton}
                onPress={onPressLogin}
            >
                <AntDesign name="login" size={24} />
                <Text style={styles.textButtonLogin}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressRegister} style={styles.buttonRegister}>
                <Text style={styles.labelRegister}>
                    Register
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        alignItems: "center",
    },
    container: {
        width: "60%",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        marginTop: 10,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        paddingTop: 5,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
    },
    containerButton: {
        flexDirection: 'row',
        marginTop:30,
        width: 100,
        height:40,
        borderRadius: 20,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    textButtonLogin:{
        fontFamily:Platform.OS === 'web'? 'BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif' : 'Roboto',
        fontSize:14,
        fontWeight:'500',
        marginLeft:10
    },
    labelRegister: {
        fontSize: 14,
        textAlign: "center",
    },
    buttonRegister:{
        marginTop:15
    }
});
