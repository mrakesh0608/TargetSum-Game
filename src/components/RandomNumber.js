import React from "react";
import PropTypes from 'prop-types';

import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default class RandomNumber extends React.Component {

    handlePress = () => {
        if (this.props.isDisabled) return;
        this.props.onPress(this.props.id);
        // console.log(this.props.number);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[
                    styles.randomNum,
                    this.props.isDisabled && styles.disabled,
                    this.props.isAns && styles.ans
                ]}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    randomNum: {
        textAlign: 'center',
        backgroundColor: '#999',
        borderRadius: 10,
        fontSize: 35,
        margin: 25,
        padding: 4,
        width:100,
    },
    disabled: {
        opacity: 0.3
    },
    ans: {
        backgroundColor: 'lightgreen',
        opacity: 0.5,
    }
})

RandomNumber.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isAns: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
}