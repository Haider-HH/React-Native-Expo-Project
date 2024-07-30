import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

interface buttonProps {
    text: string;
    handlePress: () => void;
}

const Button: React.FC<buttonProps> = ({ text, handlePress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <View style={styles.buttonStyling}>
            <Text style={styles.textStyling}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    buttonStyling: {
        backgroundColor: Colors.dark.tint,
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
    },
    textStyling: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    }
})