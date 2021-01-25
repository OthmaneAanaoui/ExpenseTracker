import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Platform, FlatList, TouchableOpacity, Text } from "react-native";
import { useCategory } from "../../context/CategoryContext";
import IconComponent from "../../components/IconComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfilStackParamList } from "../../navigators/ProfilNavigator";
import { Category } from "../../types/Category";
import { RouteProp } from "@react-navigation/native";
import DeleteModal from "../../components/DeleteModal";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    navigation: StackNavigationProp<ProfilStackParamList, 'Categories'>;
    route: RouteProp<ProfilStackParamList, 'Categories'>
};

const CategoryManagementScreen: React.FC<Props> = (props) => {
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [currentSelection, setCurrentSelection] = useState<Category>();

    const categoriesContext = useCategory()

    const navToEditCategory = (category: Category) => {
        props.navigation.navigate('CategoryEdit', { category })
    }

    const onPressModalDelete = () => {
        if (currentSelection?.id !== undefined) {
            categoriesContext?.asyncDeleteCategory(currentSelection.id)
            setCurrentSelection(undefined)
        }
        setModalDeleteVisible(!modalDeleteVisible)
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.viewLists}>

                <FlatList
                    data={categoriesContext?.getCatgories()}
                    renderItem={({ item }) => (
                            <View style={styles.card}>
                                <LinearGradient
                                    colors={['#2A2D34', '#64666A']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.backgroundlinear}
                                />
                                {/* <View style={styles.contentCard}> */}
                                <View style={[styles.categoryView, { backgroundColor: item.color }]}>
                                    <IconComponent idIcon={item.idIcon} size={20} />
                                </View>
                                <View style={styles.viewNameCategory}>
                                    <Text style={styles.nameCategoryStyle}>{item.name}</Text>
                                </View>
                                <View>
                                    <View style={styles.editButtonView}>
                                        <TouchableOpacity onPress={() => navToEditCategory(item)} style={{ marginRight: 5 }}>
                                            <IconComponent import={'MaterialIcons'} iconName="edit" size={24} color="#14B17E" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setCurrentSelection(item)
                                            setModalDeleteVisible(true)
                                        }}>
                                            <IconComponent import={'MaterialCommunityIcons'} iconName="trash-can-outline" size={24} color="#E54200" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* </View> */}
                            </View>
                    )}
                    keyExtractor={(item, index) => item.id! + index}
                    contentContainerStyle={styles.listCard}
                />
                <DeleteModal visible={modalDeleteVisible} onPressDelete={() => onPressModalDelete()} onPressCancel={() => setModalDeleteVisible(!modalDeleteVisible)} />
            </View>
            <TouchableOpacity style={styles.buttonIncome} onPress={() => props.navigation.navigate("CategoryEdit")}>
                <IconComponent import={'AntDesign'} iconName="plus" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CategoryManagementScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor: "#212227",
        alignItems: "center"
    },
    viewLists: {
        flex: 1,
        width: '95%',
    },
    listCard: {
        flexGrow: 1,
        paddingBottom: 60
    },
    buttonIncome: {
        position: "absolute",
        backgroundColor: "green",
        width: 40,
        height: 40,
        bottom: 10,
        right: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 100,
    },




    card: {
        width: "100%",
        height: 50,
        overflow: "hidden",
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contentCard: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundlinear: {
        position: 'absolute',
        top: -20,
        height: 500,
        width: '100%'
    },
    categoryView: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginVertical: 'auto',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewNameCategory: {
        flex: 1,
        marginLeft: 5,
    },
    nameCategoryStyle: {
        color: '#f1f1f1',
        fontWeight: '500',
        fontSize: 14,
    },
    editButtonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
});
