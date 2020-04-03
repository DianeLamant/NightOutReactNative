import React from 'react';
import { TextInput } from "react-native-paper";

export default function Input({ value, handleChange }) {

    return  <TextInput
        label={value[0].toUpperCase() + value.slice(1)}
        onChangeText={text => handleChange(value, text)}
    />
}

