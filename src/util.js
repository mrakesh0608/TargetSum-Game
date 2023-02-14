import * as Haptics from 'expo-haptics';

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