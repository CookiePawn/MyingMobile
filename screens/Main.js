import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, {useEffect, useState} from 'react';
import db from '../DB/Firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';






const CustomList = (props) => {
        return (
            <View style={styles.objectSubView}>
                <Image style={styles.objectImage} source={props.image}/>
                <Text>{props.name}</Text>
                <Text>{props.price}원</Text>
            </View> 
        )
}








const Main = (props) => {
    const [objects, setObjects] = useState([]) 
    const isFocused = useIsFocused();





    useEffect(() => {
        const readFromDB = async () => {
            try {
                const data = await getDocs(collection(db, 'objects'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setObjects(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        readFromDB();
    }, [isFocused]);











    return (
        <View style={styles.mainView}>  
            <View style={styles.iconView}>
                <TouchableOpacity style={styles.icon}>
                    <Icon name='exit-outline' size={30} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryView}>
                <Text style={styles.titleText}>Category</Text>
                <View style={styles.categorySubView}>
                    <View style={styles.categorySubSubView}>
                        <TouchableOpacity style={styles.listBtn}>
                            <Image style={[styles.image, {borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]} source={require('../assets/list.jpg')}/>
                            <Text style={[styles.listTitleText, {color: 'white'}]}>등록한 물건</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categorySubSubView}>
                        <TouchableOpacity 
                            style={[styles.cameraBtn, {marginBottom: 10, borderTopRightRadius: 20}]}
                            onPress={() => {
                                props.navigation.navigate('UserCamera')
                            }}
                        >
                            <Image style={[styles.image, {borderTopRightRadius: 20}]} source={require('../assets/camera.jpg')}/>
                            <Text style={styles.listTitleText}>물건 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cameraBtn, {borderBottomRightRadius: 20}]}>
                            <Icon name='person' size={50} color='white'/>
                            <Text style={[styles.listTitleText, {color: 'white'}]}>개인 정보</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.hotView}>
                <Text style={styles.titleText}>Hot</Text>
                <View style={styles.objectView}>
                    <ScrollView 
                        style={{flex: 1}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {objects.map((item, idx) => {
                            return (
                                <CustomList
                                    image={{uri: item.image}}
                                    name={item.name}
                                    price={item.price}
                                />
                            )
                        })}
                        
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}


export default Main




const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //아이콘 뷰
    iconView: {
        width: '90%',
        height: 100
    },
    icon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },



    //카테고리 뷰
    categoryView: {
        width: '90%',
        marginTop: 30,
    },
    titleText: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categorySubView: {
        flexDirection: 'row',
        height: 300,
    },
    categorySubSubView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listBtn: {
        width: 180,
        height: 300,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        backgroundColor: '#1111',
    },
    cameraBtn: {
        width: 180,
        height: 145,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    listTitleText: {
        position: 'absolute',
        bottom: 10,
        color: 'gray',
        fontWeight: 'bold',
    },


    //인기 물건 뷰
    hotView: {
        width: '90%',
        marginTop: 50,
    },
    objectView: {
        width: '100%',
        flexDirection: 'row',
    },
    objectSubView: {
        width: 150,
        height: 200,
        backgroundColor: '#1111',
        borderRadius: 10,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    objectImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: 'white',
    },
})