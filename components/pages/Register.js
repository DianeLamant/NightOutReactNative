import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Avatar } from "react-native-paper";

import TextInput from '../atoms/TextInput';

export default function Register({ navigation }) {

    const [ user, setUser ] = useState({});

    function handleChange(key, value) {
        setUser(prevState=> ({
            ...prevState,
            [key] : value.trim()
        }))
    }

    function handleSubmit() {
        if(user.username != null && user.email != null && user.password != null &&
            user.username.length > 3 && user.email.length > 6 && user.password.length > 6) {
            fetch(`http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(() => {
                navigation.navigate('Login')

            })
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.icon}>
            <Avatar.Icon size={104} icon="account" color="white"/>
        </View>

        <View style={styles.formContainer}>
            <View style={styles.form}>
                <TextInput
                    value={'username'}
                    handleChange={handleChange}
                />
                <TextInput
                    value={'email'}
                    handleChange={handleChange}
                />
                <TextInput
                    type='password'
                    value={'password'}
                    handleChange={handleChange}
                />
                <Button
                    // icon="camera"
                    mode="outlined"
                    onPress={handleSubmit}
                    >
                    Sign up
                </Button>
            </View>
        </View>

        <View style={styles.message}>
            <Text>Already have an account ? </Text>
            <Button
                mode="text"
                onPress={() => {
                    navigation.navigate('Login')
                }}
                >
                Sign in
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
        flex: 8,
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

