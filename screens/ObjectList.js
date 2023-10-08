import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native'
import React, { useEffect, useState, } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import db from '../DB/Firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';









const CustomList = (props) => {
    return (
        <View style={styles.listSubView}>
            <Image
                style={styles.profileImage}
                source={props.image}
            />
            <View style={styles.listSubSubView}>
                <Text style={styles.nameText}>{props.name}</Text>
                <Text style={styles.infoText}>{props.price}원</Text>
            </View>
        </View>
    )
}










const ObjectList = (props) => {

    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;


    //검색
    const [search, setSearch] = useState('')


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
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    내 물건 보기
                </Text>
                <TouchableOpacity
                    style={[styles.icon, { left: 0, }]}
                    onPress={() => {
                        props.navigation.navigate('Main', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchTextinput}
                    placeholder='검색어를 입력하세요'
                    placeholderTextColor='#777'
                    value={search}
                    onChangeText={(e) => { setSearch(e) }}
                    maxLength={20}
                />
            </View>
            <View style={styles.listView}>
                <ScrollView
                    style={{ marginBottom: 250, }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {objects.map((item, idx) => {
                        if (search == '') {
                            return (
                                <CustomList
                                    key={idx}
                                    image={item.image ? { uri: item.image } : require('../assets/favicon.png')}
                                    name={item.name}
                                    price={item.price}
                                />
                            )
                        } else if (item.name.includes(search)) {
                            return (
                                <CustomList
                                    key={idx}
                                    image={item.image ? { uri: item.image } : require('../assets/favicon.png')}
                                    name={item.name}
                                    price={item.price}
                                />
                            )
                        }

                    })}
                </ScrollView>
            </View>
        </View>
    )
}


export default ObjectList




const styles = StyleSheet.create({
    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },



    //content
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },



    //검색창
    searchView: {
        width: '90%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchTextinput: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingLeft: 10,
    },




    //사람 목록
    listView: {
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        margin: 10,
        marginRight: 20,
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 40,
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)'
    },




})