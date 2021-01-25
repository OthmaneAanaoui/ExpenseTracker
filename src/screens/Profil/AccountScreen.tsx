import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform, Button, Alert} from "react-native";
import { Input } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import {useAuth} from "../../context/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ProfilStackParamList } from "../../navigators/ProfilNavigator";

type Props = {
    navigation: StackNavigationProp<ProfilStackParamList ,'Account'>;
};

const AccountScreen: React.FC<Props> = ({ navigation }) => {
    const auth = useAuth();

    const loadEmail = () => {
        let email = auth.user?.email;
        if( email === undefined || email === null) return "";
        else return email.toString();
    }

    const [editionEmail, setEditionEmail] = useState<boolean>(false)
    const [editionPassword, setEditionPassword] = useState<boolean>(false)
    const [editionMsg, setEditionMsg] = useState<boolean>(false);
    const [inputEmail, setInputEmail] = useState<string>(loadEmail)
    const [inputPassword, setInputPassword] = useState<string>("")

    useEffect(() => {
        console.log(loadEmail())
    }, [])

    const onPressEditEmail = () => {
        setEditionEmail(true);
    }

    const onPressValidEditEmail = () => {
        auth.user?.verifyBeforeUpdateEmail(inputEmail);
        auth.user?.updateEmail(inputEmail);
        setEditionEmail(false);
    }

    const onPressCancelEditEmail = () => {
        let email = auth.user?.email;
        setInputEmail((email === undefined || email === null) ? "" : email.toString());
        setEditionEmail(false);
    }


    function onPressCancelEditPassword() {
        setInputPassword("");
        setEditionPassword(false);
        setEditionMsg(false);
    }

    const onPressValidEditPassword = () => {
        if(inputPassword.length < 6){
            setEditionMsg(true);
        } else {
            auth.user?.updatePassword(inputPassword);
            setEditionPassword(false);
            setEditionMsg(false);
        }
    }

    function onPressEditPassword() {
        setInputPassword("");
        setEditionPassword(true);
        setEditionMsg(false);
    }

    function logOut () {
        auth.signOut;
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.container}>
                <View style={styles.containerInformation}>
                    {editionEmail ?
                        <Input style={styles.input} value={inputEmail} onChangeText={value => setInputEmail(value)}/>
                        :
                        <Text style={styles.information}>{"Email : " + inputEmail}</Text>
                    }
                </View>
                {editionEmail ?
                    // affichage des boutons valid et cancel edition
                    <View style={styles.viewButtonsEdtion}>
                        <TouchableOpacity
                            style={styles.buttonEditNote}
                            onPress={onPressValidEditEmail}
                        >
                            <AntDesign name="checkcircleo" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonEditNote}
                            onPress={onPressCancelEditEmail}
                        >
                            <AntDesign name="closecircleo" size={24} />
                        </TouchableOpacity>
                    </View>
                    :
                    // affichage du bouton pour entrer en édition
                    <TouchableOpacity
                        style={styles.buttonEditNote}
                        onPress={onPressEditEmail}
                    >
                        <Feather name="edit-2" size={24} />
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.container}>
                <View style={styles.containerInformation}>
                    {editionPassword ?
                        <Input style={styles.input} value={inputPassword} onChangeText={value => setInputPassword(value)}/>
                        :
                        <Text style={styles.information}>{"Password"}</Text>
                    }
                    {editionMsg ?
                        <Text style={styles.alert}>You need at least 6 characters in the password</Text>
                        :
                        <Text>hh</Text>
                    }
                </View>
                {editionPassword ?
                    // affichage des boutons valid et cancel edition
                    <View style={styles.viewButtonsEdtion}>
                        <TouchableOpacity
                            style={styles.buttonEditNote}
                            onPress={onPressValidEditPassword}
                        >
                            <AntDesign name="checkcircleo" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonEditNote}
                            onPress={onPressCancelEditPassword}
                        >
                            <AntDesign name="closecircleo" size={24} />
                        </TouchableOpacity>
                    </View>
                    :
                    // affichage du bouton pour entrer en édition
                    <TouchableOpacity
                        style={styles.buttonEditNote}
                        onPress={onPressEditPassword}
                    >
                        <Feather name="edit-2" size={24} />
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.logoutContainer}>
                <TouchableOpacity
                style={styles.logout}
                onPress={logOut}
                >
                    <Text style={{color:'white'}}> Log Out </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor:"#212227"
    },
    information: {
        textAlign: "left",
        color: "white"
    },
    container:{
        flexDirection: 'row',
        marginTop:10,
        marginLeft: 10,
        alignItems: "flex-start"
    },
    containerInformation:{
        flex:8,
    },
    buttonEditNote:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    viewButtonsEdtion: {
        flex:1,
        alignItems: 'flex-end',
        height: 60,
        marginLeft:15
    },
    input:{
        fontSize: 15,
        color: "white"
    },
    alert:{
        fontSize:12,
        marginLeft: 20,
        color: 'grey'
    },
    logoutContainer:{
        alignItems: "center",
        marginTop: 30
    },
    logout:{
        borderRadius: 5,
        paddingTop: 4,
        textAlign: "center",
        textAlignVertical: "center",
        width: 70,
        height: 30,
        backgroundColor: '#606060'
    }
});
