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
        backgroundColor: '#999',
        width: 100,
        padding: 4,
        margin: 25,
        fontSize: 35,
        textAlign: 'center',
        borderRadius: 10,
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