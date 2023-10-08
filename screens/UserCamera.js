import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons'

const UserCamera = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [imgUri, setImgUri] = useState(null)
    const cameraRef = useRef(null);

    // Flask 서버 엔드포인트 URL
    const serverUrl = 'http://192.168.0.2:5000';

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo.uri)
            setImgUri(photo.uri)
        }
    };



    const uploadImage = async () => {
        props.navigation.navigate('Prediction',{
            imgUri: imgUri,
        })


        const formData = new FormData();
        formData.append('photo', {
            uri: imgUri,
            type: 'image/jpeg', // 변경 가능
            name: 'photo.jpg',
        });

        fetch(`${serverUrl}/upload`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // 서버 응답 처리
                console.log('서버 응답:', data);
            })
            .catch((error) => {
                console.error('사진 업로드 오류:', error);
            });
    };






    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={cameraType}
                ref={cameraRef}>
            </Camera>
            <View style={styles.takePictureView}>
                <TouchableOpacity
                    style={styles.takePictureBtn}
                    onPress={takePicture}>
                    <View style={styles.takePictureSubBtn}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.flipBtn}
                    onPress={() => {
                        setCameraType(
                            cameraType === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Icon name='sync-outline' size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.useImageView}
                    onPress={() => {
                        uploadImage()
                    }}
                >
                    <Image
                        style={styles.useImage}
                        source={{ uri: imgUri }}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default UserCamera



const styles = StyleSheet.create({


    //촬영 버튼
    takePictureView: {
        height: 180,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    takePictureBtn: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
    },
    takePictureSubBtn: {
        backgroundColor: 'red',
        width: '90%',
        height: '90%',
        borderRadius: 100,
    },
    flipBtn: {
        position: 'absolute',
        right: 20,
    },
    useImageView: { 
        position: 'absolute', 
        left: 20, 
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 20,
    },
    useImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
})