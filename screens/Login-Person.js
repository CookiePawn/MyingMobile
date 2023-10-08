import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import db from '../DB/Firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react'





const CustomTextInput = (props) => {
    return (
        <View>
            <Text style={styles.textInputTitleText}>{props.name}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={`${props.name}${props.named} 입력해주세요`}
                maxLength = {20}
                onChangeText={props.onChangeText}
            />
        </View>    
    )
}







const Login = (props) => {
    const [user, setUser] = useState([])
    const [id, setID] = useState('')
    const [pw, setPW] = useState('')

    const isFocused = useIsFocused();



    useEffect(() => {
        const readFromDB = async () => {
            try {
                const data = await getDocs(collection(db, 'users'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setUser(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        readFromDB();
    }, [isFocused]);


    const login = () => {
        let bool = false
        user.map((row, idx) => {
            if (row.ID == id && row.PW == pw) {
                props.navigation.navigate("Main", {
                    num: row.id,
                    id: row.ID,
                    pw: row.PW,
                    phone: row.phone,
                    name: row.name,
                    email: row.email,
                });
                alert(`어서오세요 ${row.name}님!`)
                setID('')
                setPW('')
                bool = true
            }
        })
        if (!bool) {
            alert('ID 또는 PASSWORD가 틀렸습니다')
            setID('')
            setPW('')
        }
    }




    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity 
                    style= {styles.backButton}
                    onPress={() => {props.navigation.navigate('Main')}}>
                    <Icon style={styles.backButtonIcon} name="home-outline"></Icon>
                </TouchableOpacity>
                <Text style={styles.titleText}>로그인</Text>
            </View>
            <View style={styles.textInputView}>
                <CustomTextInput
                    name='아이디'
                    named='를'
                    onChangeText={(e) => setID(e)}
                />
                <CustomTextInput
                    name='비밀번호'
                    named='를'
                    onChangeText={(e) => setPW(e)}
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity 
                    style={styles.signButton}
                    onPress={login}
                >
                    <Text style={styles.signButtonText}>로그인</Text>
                </TouchableOpacity>
                <View style={styles.buttonSubView}>
                    <Text style={styles.loginButtonText}>
                        아직 회원이 아니신가요?
                        <TouchableOpacity 
                            onPress={() => {props.navigation.navigate('SignUp')}}
                        >
                            <Text style={styles.loginButtonSubText}>회원가입</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>    
    )
}


export default Login





const styles = StyleSheet.create({

    //로그인
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems : 'center',
        justifyContent: 'center'
    },
    titleView: {
        flex: 0.15,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton : {
        position : 'absolute',
        left : 0,
    },
    backButtonIcon : {
        fontSize : 25,
    },



    textInputView: {
        flex: 0.3,
        width: '90%',
        justifyContent: 'center',
    },
    textInputTitleText: {
        color: '#9EA3B2',
    },
    textInput: {
        height: 60,
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        borderWidth: 0,
        marginTop: 8,
        marginBottom: 20,

        color: '#9EA3B2',
        paddingLeft: 14,
        fontSize: 14,
    },



    buttonView: {
        flex: 0.4,
        width: '90%',
    },
    signButton: {
        height: 60,
        borderRadius: 16,
        backgroundColor: '#5552E2',
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loginButtonText: {
        color: '#9EA3B2',
        fontSize: 14,
        marginTop: 20,
    },
    loginButtonSubText: {
        color: 'black',
        textDecorationLine: 'underline',
        marginLeft: 8
    },
    buttonSubView: {
        width: '100%',
        alignItems: 'center',
    },

})