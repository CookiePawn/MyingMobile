import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react';
import db from '../DB/Firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';










const Main = (props) => {

    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;

    const [objects, setObjects] = useState([])
    const isFocused = useIsFocused();


    // 총 금액을 계산하는 함수
    const calculateTotalPrice = () => {
        const totalPrice = objects.reduce((acc, item) => {
            return acc + parseInt(item.price);
        }, 0);

        if (num === null) return '로그인이 필요합니다'
        return totalPrice;
    };





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
                {num !== null && (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {
                            props.navigation.navigate("Main");
                            alert('로그아웃 되었습니다');
                        }}
                    >
                        <Icon name='exit-outline' size={30} color='black' />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.categoryView}>
                <Text style={styles.titleText}>Category</Text>
                <View style={styles.categorySubView}>
                    <View style={styles.categorySubSubView}>
                        <TouchableOpacity
                            style={styles.listBtn}
                            onPress={() => {
                                if (num !== null) {
                                    props.navigation.navigate('ObjectList', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                } else {
                                    alert('로그인이 필요합니다!')
                                }

                            }}
                        >
                            <Image style={[styles.image, { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]} source={require('../assets/list.jpg')} />
                            <Text style={[styles.listTitleText, { color: 'white' }]}>등록한 물건</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categorySubSubView}>
                        <TouchableOpacity
                            style={[styles.cameraBtn, { marginBottom: 10, borderTopRightRadius: 20 }]}
                            onPress={() => {
                                if (num !== null) {
                                    props.navigation.navigate('UserCamera', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                } else {
                                    alert('로그인이 필요합니다!')
                                }
                            }}
                        >
                            <Image style={[styles.image, { borderTopRightRadius: 20 }]} source={require('../assets/camera.jpg')} />
                            <Text style={styles.listTitleText}>물건 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.cameraBtn, { borderBottomRightRadius: 20 }]}
                            onPress={() => {
                                if (num !== null) {
                                    props.navigation.navigate('MyPage', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                } else {
                                    props.navigation.navigate('Login')
                                }
                            }}
                        >
                            <Icon name='person' size={50} color='white' />
                            <Text style={[styles.listTitleText, { color: 'white' }]}>개인 정보</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.priceView}>
                <Text style={styles.titleText}>PRICE</Text>
                <View style={styles.priceSubView}>
                    <Text style={styles.totalPriceText}>
                        <Text style={styles.totalPriceTitle}>총 자산{'\n'}</Text>
                        {calculateTotalPrice()}
                        <Text style={{ fontSize: 20 }}> 원</Text>
                    </Text>
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



    //금액 뷰
    priceView: {
        width: '90%',
        marginTop: 50,
    },
    priceSubView: {
        width: '100%',
        height: 200,
        backgroundColor: '#c9c9c9',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalPriceTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 100
    },
    totalPriceText: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },








})