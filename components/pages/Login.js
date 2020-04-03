import React, { useState, useContext } from 'react';
import { GlobalState } from '../store';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from "react-native-paper";

import TextInput from '../atoms/TextInput';

export default function Login({ navigation }) {

    const [ user, setUser ] = useState({});
    const { dispatch } = useContext(GlobalState);

    function handleChange(key, value) {
        setUser(prevState=> ({
            ...prevState,
            [key] : value.trim()
        }))
    }

    function handleSubmit() {
        fetch(`http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then((res) => {
            for(let oneUser of res) {
                if(oneUser.email === user.email && oneUser.password == oneUser.password) {
                    dispatch({
                        type: 'setIsLogged',
                        payload: { isLogged: true},
                    });
                    dispatch({
                        type: 'setUser',
                        payload: { user: {username: oneUser.username}},
                    });
                    return;
                }
            }
            alert('Wrong email or password')
        })
    }

    return (
      <View style={styles.container}>
            <View style={styles.icon}>
                <Avatar.Icon size={104} icon="account" color="white"/>
            </View>

        <View style={styles.formContainer}>
            <View style={styles.form}>
                <TextInput
                    value={'email'}
                    handleChange={handleChange}
                />
                <TextInput
                    value={'password'}
                    handleChange={handleChange}
                />
                <Button
                    // icon="camera"
                    mode="outlined"
                    onPress={handleSubmit}
                    >
                    Sign in
                </Button>
            </View>
        </View>

        <View style={styles.message}>
            <Text>New to NightOut ? </Text>
            <Button
                mode="text"
                onPress={() => {
                    navigation.navigate('Register')
                }}
                >
                Sign up
            </Button>
        </View>

      </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon:{
        flex: 3,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 6,
    },
    form: {
        height: '70%',
        justifyContent: 'space-around'
    },
    message: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

