import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'





const CustomList = (props) => {
    return (
        <TouchableOpacity
            style={styles.predictionListBtn}
            onPress={() => {
                props.navi.navigation.navigate('UserInput', props.params)
            }}
        >
            <Text style={styles.predictionListBtnText}>{props.text1} {props.text2}</Text>
        </TouchableOpacity>
    )
}








const Prediction = (props) => {

    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;


    const imgUri = params ? params.imgUri : null;
    const [prediction, setPrediction] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    const isFocused = useIsFocused();


    useEffect(() => {

        setPrediction({})

        // Flask 서버 엔드포인트 URL
        const serverUrl = 'http://192.168.0.2:5000';

        setTimeout(() => {
            // '/predictTopPrediction' 엔드포인트에 GET 요청 보내기
            fetch(`${serverUrl}/predictTopPrediction`)
                .then((response) => response.json())
                .then((data) => {
                    // 서버로부터 받은 JSON 데이터를 prediction 상태로 설정
                    setPrediction(data);
                })
                .catch((error) => {
                    console.error('서버 요청 중 오류:', error);
                });
            setIsLoading(false);
        }, 1000);



    }, [isFocused]);



    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicator
                    size="large"
                    color="lightskyblue"
                />
            </View>
        )
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.iconView}>
                <TouchableOpacity
                    style={[styles.icon, { left: 50 }]}
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
                    <Icon name='camera-outline' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
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
                    <Icon name='home-outline' size={30} color='black' />
                </TouchableOpacity>
            </View>
            {prediction ? (
                <View style={styles.predictionView}>
                    <Image
                        source={{ uri: imgUri }}
                        style={styles.predictionImage}
                    />
                    <CustomList
                        text1={`1. ${prediction.label1_1}`}
                        text2={`${prediction.label1_2}`}
                        navi={props}
                        params={{
                            title: prediction.label1_1,
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                    <CustomList
                        text1={`2. ${prediction.label2_1}`}
                        text2={`${prediction.label2_2}`}
                        navi={props}
                        params={{
                            title: prediction.label2_1,
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                    <CustomList
                        text1={`3. ${prediction.label3_1}`}
                        text2={`${prediction.label3_2}`}
                        navi={props}
                        params={{
                            title: prediction.label3_1,
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                    <CustomList
                        text1={`4. ${prediction.label4_1}`}
                        text2={`${prediction.label4_2}`}
                        navi={props}
                        params={{
                            title: prediction.label4_1,
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                    <CustomList
                        text1={`5. ${prediction.label5_1}`}
                        text2={`${prediction.label5_2}`}
                        navi={props}
                        params={{
                            title: prediction.label5_1,
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                    <CustomList
                        text1={`일치하지 않아요!`}
                        navi={props}
                        params={{
                            uri: imgUri,
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        }}
                    />
                </View>
            ) : (
                <Text>예측을 기다리는 중...</Text>
            )}
        </View>
    );
}


export default Prediction




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
        left: 0,
        bottom: 0,
    },



    //예측 결과 뷰
    predictionView: {
        width: '90%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    predictionImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    predictionListBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#1111',
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    predictionListBtnText: {
        color: 'gray',
        fontWeight: 'bold',
    },

})