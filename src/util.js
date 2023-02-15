import { Animated } from "react-native";
import * as Haptics from 'expo-haptics';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

function capitalize(text) {
    text = text.toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
}

export function haptic(type) {

    type = capitalize(type);

    if (['Light', 'Medium', 'Heavy'].includes(type)) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[type])
    }
    else if (['Success', 'Error', 'Warning'].includes(type)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[type])
    }
    else Haptics.selectionAsync()
}

export function randomNumBetween(min, max) {
    // min and max included 
    return min + Math.floor(Math.random() * (1 + max - min))
}

export class AnimateColor {

    //must be rgb
    //startCallBack must be passed with anonymous function
    constructor({ type, initialValue, finalValue, duration, startCallBack = () => { } }) {

        this.color = new Animated.Value(0);
        eleColor = this.color.interpolate({
            inputRange: [0, 1],
            outputRange: [initialValue, finalValue]
        })

        this.type = type
        this.eleColor = eleColor;
        this.duration = duration;
        this.startCallBack = startCallBack;
    }

    doAni() {
        Animated.timing(this.color, {
            toValue: 1,
            duration: this.duration,
            useNativeDriver: false,
        }).start((val) => {
            // console.log(this.duration);
            this.startCallBack(val);
        });
    }
}