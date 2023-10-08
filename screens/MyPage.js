import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const MyPage = (props) => {
    //로그인 확인
    const { num, id, pw, phone, name, email, image } = props.route.params;

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity
                    style={[styles.icon, {left: 0}]}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Icon name='arrow-back-outline' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.icon, {right:0}]}
                    onPress={() => {
                        props.navigation.navigate("Main");
                        alert('로그아웃 되었습니다');
                    }}
                >
                    <Icon name='exit-outline' size={30} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
                <Image
                    source={image ? { uri: image } : require('../assets/icon.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.userInfoSection}>
                <Text style={styles.userInfoLabel}>회원 정보</Text>
                <Text style={styles.userInfo}>ID: {id}</Text>
                <Text style={styles.userInfo}>PW: {pw}</Text>
                <Text style={styles.userInfo}>전화번호: {phone}</Text>
            </View>
        </View>
    );
};


export default MyPage

const styles = StyleSheet.create({
    container: {
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
        bottom: 0,
    },




    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
    },
    userInfoSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    userInfoLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
});
