import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Switch } from 'react-native';

interface ExpenseEditModalProps {
    visible: boolean;
    onPressDelete: Function;
    onPressCancel: Function;
    isIncome?: boolean;
}

const ExpenseEditModal = (props: ExpenseEditModalProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(props.visible)
    const [isIncomes, setIncomes] = useState<boolean>(props.isIncome || false)

    useEffect(() => {
        setModalVisible(props.visible)
    }, [props.visible])

    const toggleSwitch = () => {
        setIncomes(!isIncomes);
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // setModalVisible(!modalVisible)
                    props.onPressCancel();
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <LinearGradient
                            colors={['#858D99', '#535963']}
                            start={{x:0,y:0}}
                            end={{x:0.5,y:0.5}}
                            style={styles.backgroundlinear}
                        />
                <View style={styles.viewSwitchIncome}>
                    <Text style={styles.textSwitchButton}>Expense</Text>
                    <Switch
                        trackColor={{ false: "#363636", true: "#363636" }}
                        thumbColor={isIncomes ? "red" : "#14B17E"}
                        onValueChange={toggleSwitch}
                        value={!isIncomes}
                        style={{transform:[{ scaleX: 1.5}, { scaleY: 1.5 }], marginHorizontal:10}}
                    />
                    <Text style={styles.textSwitchButton}>Income</Text>
                </View>
                        <Text style={styles.modalText}>Please note that the deletion is irreversible.</Text>
                        <View style={styles.modalButtonView}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#FF2300' }}
                                onPress={() => props.onPressDelete()}>
                                <Text style={styles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => {
                                    // setModalVisible(!modalVisible);
                                    props.onPressCancel()
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ExpenseEditModal;

const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        position: "absolute",
        flex: 1,
        margin: 20,
        width: "95%",
        height: "99%",
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backgroundlinear: {
        position: 'absolute',
        //top: -20,
        height: "100%",
        width: '100%'
    },
    modalText: {
        marginVertical: 15,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalButtonView: {
        flexDirection: 'row',
    },
    modalBackgroundSail: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: 2500,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    viewSwitchIncome:{
        flexDirection: 'row',
        marginTop:15,
    },
    textSwitchButton:{
        color: 'white', 
        fontSize:18 
    }
});
