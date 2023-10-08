import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, } from 'react';
import db from '../DB/Firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore';


const UserInput = (props) => {

    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;


    const imgUri = params ? params.uri : null;
    const title = params ? params.title : null;

    const [titleInput, setTitleInput] = useState(title)
    const [nameInput, setNameInput] = useState('')
    const [priceInput, setPriceInput] = useState('0')


    const uploadDB = async() => {
        //db에 넣어라
        try {
            await addDoc(collection(db, 'objects'), {
                title: titleInput,
                name: nameInput,
                price: priceInput,
                image: imgUri,
            });
            alert('등록되었습니다!')
            props.navigation.navigate('Main', {
                num: num,
                id: id,
                pw: pw,
                phone: phone,
                name: name,
                email: email,
            })
        } catch (error) {
            console.log(error)
        }
    }







    return (
        <View style={styles.mainView}>
            <View style={[styles.iconView, {left: 0}]}>
                <TouchableOpacity 
                    style={styles.icon}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Icon name= 'arrow-back-outline' size={30} color= 'black'/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.icon, {right: 0}]}
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
                    <Icon name='home-outline' size={30} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.icon, {right: 50}]}
                    onPress={() => {
                        props.navigation.navigate('UserCamera', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        })
                    }}
                >
                    <Icon name='camera-outline' size={30} color='black'/>
                </TouchableOpacity>
            </View>
           <Image
                source={{ uri: imgUri }}
                style={styles.predictionImage}
            /> 
            <View style={styles.textinputView}>
                <Text style={styles.textinputTitle}>분류</Text>
                <TextInput
                    style= {styles.textinput}
                    placeholder='종류를 입력해주세요'
                    value={titleInput}
                    onChangeText={(e) => {setTitleInput(e)}}
                    maxLength={100}
                />
                <Text style={styles.textinputTitle}>제품명</Text>
                <TextInput
                    style= {styles.textinput}
                    placeholder='제품명을 입력해주세요'
                    value={nameInput}
                    onChangeText={(e) => {setNameInput(e)}}
                    maxLength={100}
                />
                <Text style={styles.textinputTitle}>금액</Text>
                <TextInput
                    style= {styles.textinput}
                    placeholder='금액을 입력해주세요'
                    value={priceInput}
                    onChangeText={(e) => {setPriceInput(e)}}
                    maxLength={100}
                />
            </View>
            <View style={styles.comView}>
                <TouchableOpacity 
                    style={styles.comBtn}
                    onPress={() => {
                        uploadDB()
                    }}
                >
                    <Text style={styles.comBtnText}>등록하기</Text>
                </TouchableOpacity>    
            </View>
        </View>
    )
}



export default UserInput



const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },



    //아이콘 뷰
    iconView: {
        width: '90%',
        height: 100,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },  


    //이미지
    predictionImage: {
        width: '90%',
        height: 300,
        borderRadius: 20,
        marginTop: 30,
    },



    //텍스트 인풋 뷰
    textinputView: {
        flex: 1,
        width: '90%',
        marginTop: 30,
        alignItems: 'flex-start'
    },
    textinputTitle: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#1111',
        padding: 5,
    },
    textinput: {
        width: '100%',
        height: 50,
        backgroundColor: '#1111',
        fontSize: 20,
        paddingLeft: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        marginBottom: 20,
    },







    //완료 버튼
    comView: {
        width: '90%',
        marginBottom: 50,
    },
    comBtn: {
        width: '100%',
        height: 50,
        backgroundColor: 'lightskyblue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    comBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },




})