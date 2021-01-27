import React, { useContext, useState } from "react";
import { Image, Alert, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
//import { useStoreState } from '../hooks/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
        <SafeAreaView style={styles.droidSafeArea}>
            {/* <View style={styles.container}> */}
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">



                    <Image
                        style={styles.logo}
                        source={require('../images/wallet.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={setEmail}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={setPassword}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPressLogin}>
                        <Text style={styles.buttonTitle}>Se connecter <AntDesign name="login" size={24} /></Text>
                    </TouchableOpacity>

                    <View style={styles.footerView}>

                        <Text style={styles.footerText}>Vous n'avez pas de compte? <Text onPress={onPressRegister} style={styles.footerLink}>s'inscrire</Text></Text>
                    </View>
                </KeyboardAwareScrollView>
            {/* </View> */}
        </SafeAreaView>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor: "#212227"
      },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: 'green',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#f1f1f1'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
